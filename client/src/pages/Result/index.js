import { useEffect, useState } from "react";

import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";

import SearchItem from "~/Layouts/components/SearchItem";
import { getProducts } from "~/redux/product/productSlice";
import request from "~/utils/httpRequest";

import "./Result.scss";

const Result = () => {
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.product.products);
  const value = useSelector((state) => state.product.searchTerm);
  const dispatch = useDispatch();

  const [pageNum, setPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const limit = 8;

  useEffect(() => {
    const fetchData = async () => {
      const res = await request.get(
        `products/?page=${pageNum}&limit=${limit}&searchTerm=${value}&active=false`,
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
  }, [pageNum, value]);

  const handlePageClick = (data) => {
    setPageNum(data.selected + 1);
  };

  return (
    <div className="result">
      <div className="">
        <div className="">
          <div>Search result for {`"${value}"`}</div>
          <div>
            <input />
          </div>
          <div className="">
            {products?.items?.map((product) => (
              <SearchItem key={product.id} product={product} />
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

export default Result;
