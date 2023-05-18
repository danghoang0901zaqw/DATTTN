import {
  faBars,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faFilter,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "~/components/Button/Button";
import request from "~/utils/httpRequest";
import "./Home.scss";

import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import Product from "~/Layouts/components/Product";
import { getProducts } from "~/redux/product/productSlice";
import Slider from "~/Layouts/components/Slider/Slider";

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.product.products);
  const searchTerm = useSelector((state) => state.product.searchTerm);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [pageNum, setPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [titleSort, setTitleSort] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortType, setSortType] = useState("");
  const [active, setActive] = useState(false);
  const prevRef = useRef();
  const nextRef = useRef();

  const limit = 12;

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const res = await request.get(
          sortBy
            ? `products/?page=${pageNum}&limit=${limit}&searchTerm=${searchTerm}&sortBy=${sortBy}&active=${active}&sortType=${sortType}`
            : `products/?page=${pageNum}&limit=${limit}&searchTerm=${searchTerm}&active=${active}`,
          {
            headers: {
              Authorization: `Bearer ${user}`,
            },
          }
        );
        setPageNum(res.data.pagination.currentPage);
        setTotalPage(Math.ceil(res.data.pagination.totalItem / limit));
        dispatch(getProducts(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [pageNum, searchTerm, sortBy, active, sortType, user]);
  const handleChangePage = (type) => {
    if (type === "prev") {
      setPageNum((prev) => (prev === 1 ? 1 : prev - 1));
    } else {
      setPageNum((next) => (next === totalPage ? totalPage : next + 1));
    }
  };
  useEffect(() => {
    pageNum === 1
      ? (prevRef.current.className = "disable")
      : (prevRef.current.className = "");

    pageNum === totalPage
      ? (nextRef.current.className = "disable")
      : (nextRef.current.className = "");
  }, [pageNum, totalPage]);
  const handlePageClick = (data) => {
    setPageNum(data.selected + 1);
  };
  const handleSortBy = (type) => {
    switch (type) {
      case "nameAsc":
        setTitleSort(t("sortFilter.nameAsc"));
        setSortBy("name");
        setSortType("asc");
        break;
      case "nameDesc":
        setTitleSort(t("sortFilter.nameDesc"));
        setSortBy("name");
        setSortType("desc");
        break;
      case "priceAsc":
        setTitleSort(t("sortFilter.priceAsc"));
        setSortBy("price");
        setSortType("asc");
        break;
      case "priceDesc":
        setTitleSort(t("sortFilter.priceDesc"));
        setSortBy("price");
        setSortType("desc");
        break;
      case "dateDesc":
        setTitleSort(t("sortFilter.dateDesc"));
        setSortBy("createdAt");
        setSortType("desc");
        break;
      case "dateAsc":
        setTitleSort(t("sortFilter.dateAsc"));
        setSortBy("createdAt");
        setSortType("asc");
        break;
      case "default":
        setTitleSort(t("sortFilter.price"));
        setSortBy("");
        break;
      default:
        break;
    }
  };
  return (
    <div className="container">
      <Slider />
      <div className="home">
        <div className="home--category">
          <div className="home--category__filter">
            <div className="home--category__heading">
              <FontAwesomeIcon icon={faBars} />
              <p className="home--category__title">
                {t("asideFilter.category")}
              </p>
            </div>
            <ul className="home--category__list">
              <li className="home--category__item home--category__item-active">
                {t("asideFilter.all")}
              </li>
              <li className="home--category__item">{t("asideFilter.watch")}</li>
              <li className="home--category__item">
                {t("asideFilter.jewelry")}
              </li>
              <li className="home--category__item">
                {t("asideFilter.accessory")}
              </li>
              <li className="home--category__item">{t("asideFilter.food")} </li>
            </ul>
          </div>
          <div className="home--category__filter home--category__active">
            <div className="home--category__heading home--category__active-title">
              <FontAwesomeIcon icon={faFilter} />
              <p className="home--category__title">{t("asideFilter.filter")}</p>
            </div>
            <div className="home--category__active-wrap">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
              />
              <label> {t("asideFilter.active")}</label>
            </div>
          </div>
          <div className="home--category__price">
            <div className="home--category__heading">
              <FontAwesomeIcon icon={faTag} />
              <p className="home--category__title">{t("asideFilter.price")}</p>
            </div>
            <div className="home--category__wrap">
              <div className="home--category__input">
                <input placeholder={t("asideFilter.min")} />
              </div>
              <p>-</p>
              <div className="home--category__input">
                <input placeholder={t("asideFilter.max")} />
              </div>
            </div>
            <Button className={"btn outline full small"}>
              {t("asideFilter.apply")}
            </Button>
          </div>
          <Button className={"btn primary full"}>
            {t("asideFilter.clear")}
          </Button>
        </div>
        <div className="home--category-mobile">
          <ul className="home--category-mobile__list">
            <li className="home--category-mobile__item">
              <span>{t("asideFilter.all")}</span>
            </li>
            <li className="home--category-mobile__item">
              <span>{t("asideFilter.watch")}</span>
            </li>
            <li className="home--category-mobile__item">
              <span>{t("asideFilter.jewelry")}</span>
            </li>
            <li className="home--category-mobile__item">
              <span>{t("asideFilter.accessory")}</span>
            </li>
            <li className="home--category-mobile__item">
              <span> {t("asideFilter.food")}</span>
            </li>
            <li className="home--category-mobile__item">
              <span>
                {t("asideFilter.equipment")}
                {t("asideFilter.equipment")}
              </span>
            </li>
            <li className="home--category-mobile__item">
              <span>
                {t("asideFilter.equipment")}
                {t("asideFilter.equipment")}
              </span>
            </li>
            <li className="home--category-mobile__item">
              <span>
                {t("asideFilter.equipment")}
                {t("asideFilter.equipment")}
              </span>
            </li>
            <li className="home--category-mobile__item">
              <span>
                {t("asideFilter.equipment")}
                {t("asideFilter.equipment")}
              </span>
            </li>
            <li className="home--category-mobile__item">
              <span>
                {t("asideFilter.equipment")}
                {t("asideFilter.equipment")}
              </span>
            </li>
            <li className="home--category-mobile__item">
              <span>
                {t("asideFilter.equipment")}
                {t("asideFilter.equipment")}
              </span>
            </li>
            <li className="home--category-mobile__item">
              <span>
                {t("asideFilter.equipment")}
                {t("asideFilter.equipment")}
              </span>
            </li>
          </ul>
        </div>
        <div className="home--content">
          <div className="home--sort">
            <div className="home--sort__bar">
              <span className="home--sort__label">{t("sortFilter.sort")}</span>
              <div className="home--sort__options">
                <div className="home--sort__item home--sort__item-active">
                  {t("sortFilter.popular")}
                </div>
                <div className="home--sort__item">
                  {t("sortFilter.lastest")}
                </div>
                <div className="home--sort__item">
                  {t("sortFilter.topSale")}
                </div>
                <div>
                  <div className="home--sort__price">
                    <div className="home--sort__wrap">
                      <span className="home--sort__price-text">
                        {titleSort === "" ? t("sortFilter.price") : titleSort}
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faChevronDown} />
                      </span>
                    </div>
                    <ul className="home--sort__select">
                      <li
                        className="home--sort__select-option"
                        onClick={() => handleSortBy("default")}
                      >
                        {t("sortFilter.default")}
                      </li>
                      <li
                        className="home--sort__select-option"
                        onClick={() => handleSortBy("priceDesc")}
                      >
                        {t("sortFilter.priceDesc")}
                      </li>
                      <li
                        className="home--sort__select-option"
                        onClick={() => handleSortBy("priceAsc")}
                      >
                        {t("sortFilter.priceAsc")}
                      </li>
                      <li
                        className="home--sort__select-option"
                        onClick={() => handleSortBy("nameDesc")}
                      >
                        {t("sortFilter.nameDesc")}
                      </li>
                      <li
                        className="home--sort__select-option"
                        onClick={() => handleSortBy("nameAsc")}
                      >
                        {t("sortFilter.nameAsc")}
                      </li>
                      <li
                        className="home--sort__select-option"
                        onClick={() => handleSortBy("dateDesc")}
                      >
                        {t("sortFilter.dateDesc")}
                      </li>
                      <li
                        className="home--sort__select-option"
                        onClick={() => handleSortBy("dateAsc")}
                      >
                        {t("sortFilter.dateAsc")}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="home--paginate">
              <div className="home--paginate__state">
                <span className="home--paginate__current">{pageNum}</span>/
                <span className="home--paginate__total">{totalPage}</span>
              </div>
              <Button ref={prevRef} onClick={() => handleChangePage("prev")}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </Button>
              <Button ref={nextRef} onClick={() => handleChangePage("next")}>
                <FontAwesomeIcon icon={faChevronRight} />
              </Button>
            </div>
          </div>
          <div className="home--products">
            {products.items?.length > 0 ? (
              products.items?.map((product) => (
                <Product key={product.id} product={product} />
              ))
            ) : (
              <p className="home--products__notity">
                {t("products.noProduct")}
              </p>
            )}
          </div>
          <ul className="pagination">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              pageCount={totalPage}
              displayedPageRange={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination--item"}
              previousLinkClassName={"pagination--item"}
              nextLinkClassName={"pagination--item"}
              disabledClassName={"disabled"}
              activeClassName={"pagination--item__active"}
              disablePrevButton={pageNum === 1}
              disableNextButton={pageNum === totalPage}
              forcePage={pageNum - 1}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
