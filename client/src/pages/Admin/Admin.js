import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { getProducts } from "~/redux/product/productSlice";
import request from "~/utils/httpRequest";

import useDebounce from "~/hooks/useDebounce";

import "./Admin.scss";

const Admin = () => {
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [pageNum, setPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [active, setActive] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [sortType, setSortType] = useState("");
  const limit = 10;
  const debouncedValue = useDebounce(500, searchValue);
  const handleChange = (e) => {
    const value = e.target.value;
    if (value.startsWith(" ")) return;
    setSearchValue(value);
  };
  const handleSort = (type) => {
    switch (type) {
      case "priceAsc":
        setSortBy("price");
        setSortType("asc");
        break;
      case "priceDesc":
        setSortBy("price");
        setSortType("desc");
        break;
      case "nameDesc":
        setSortBy("name");
        setSortType("desc");
        break;
      case "nameAsc":
        setSortBy("name");
        setSortType("asc");
        break;
      case "":
        setSortBy("");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await request.get(
        sortBy
          ? `products/?page=${pageNum}&limit=${limit}&searchTerm=${debouncedValue}&active=${active}&sortBy=${sortBy}&sortType=${sortType}`
          : `products/?page=${pageNum}&limit=${limit}&searchTerm=${debouncedValue}&active=${active}`,
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      );
      setPageNum(res.data.pagination.currentPage);
      setTotalPage(
        Math.ceil(res.data.pagination.totalItem / res.data.pagination.limit)
      );
      dispatch(getProducts(res.data));
    };
    fetchData();
  }, [pageNum, debouncedValue, active, sortBy, sortType]);

  const handlePageClick = (data) => {
    setPageNum(data.selected + 1);
  };
  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
  },[user])
  return (
    <div className="table">
      <div className="table--wrapper">
        <div className="table--heading">
          <h2 className="table--heading__title">Quản lí sản phẩm</h2>
          <div className="table--heading__add">
            <FontAwesomeIcon icon={faPlus} size="1x" />
            <Link to="/admin/add">Thêm sản phẩm</Link>
          </div>
        </div>
        <div className="table--filter">
          <div className="table--filter__search">
            <input
              value={searchValue}
              onChange={handleChange}
              placeholder="Nhập sản phẩm bạn muốn tìm"
            />
          </div>
          <div className="table--filter__active">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
            <p>Đang hoạt động</p>
          </div>
          <div className="table--filter__sort">
            <select
              onChange={(e) => {
                handleSort(e.target.value);
              }}
            >
              <option value={""}>Mặc định</option>
              <option value={"priceAsc"}>Giá: Từ Thấp đến Cao</option>
              <option value={"priceDesc"}>Giá: Từ Cao đến Thấp </option>
              <option value={"nameDesc"}>{"Tên: Từ Z -> A"}</option>
              <option value={"nameAsc"}>{"Tên: Từ A -> Z"}</option>
            </select>
          </div>
        </div>
        <div className="table-view">
          <div className="table-view--heading">
            <div className="table-view--heading__id">Mã </div>
            <div className="table-view--heading__img">Hình ảnh</div>
            <div className="table-view--heading__name">Tên </div>
            <div className="table-view--heading__desc">Mô tả </div>
            <div className="table-view--heading__price">Giá </div>
            <div className="table-view--heading__action">Thao tác</div>
          </div>
          <div className="table-view--content">
            {products?.items?.map((product) => (
              <div className="table-view--content__wrap" key={product.id}>
                <div className="table-view--content__id">{product.id}</div>
                <div className="table-view--content__img">
                  <img
                    src={
                      product?.ProductImage[0]?.url
                        ? `http://${product?.ProductImage[0]?.url}`
                        : "https://down-vn.img.susercontent.com/file/vn-11134201-23020-hauu1kcwbrnvf8"
                    }
                    alt="img"
                  />
                </div>
                <div className="table-view--content__name">{product.name}</div>
                <div className="table-view--content__desc">
                  {product.description}
                </div>
                <div className="table-view--content__price">
                  {product.price}
                </div>
                <Link
                  to={`/admin/edit/${product.id}`}
                  className="table-view--content__action"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <ul className="pagination">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={totalPage}
            onPageChange={handlePageClick}
            containerClassName={"pagination--item"}
            previousLinkClassName={"pagination--item"}
            nextLinkClassName={"pagination--item"}
            disabledClassName={"disabled"}
            activeClassName={"pagination--item__active"}
            disablePrevButton={pageNum === 1}
            disableNextButton={pageNum === totalPage}
          />
        </ul>
      </div>
    </div>
  );
};

export default Admin;
