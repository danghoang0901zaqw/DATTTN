import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";

import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { Wrapper as PopperWrapper } from "~/components/Popper";

import { useDispatch, useSelector } from "react-redux";

import useDebounce from "~/hooks/useDebounce";
import { getSearchTerm } from "~/redux/product/productSlice";
import request from "~/utils/httpRequest";
import SearchItem from "../SearchItem";

import "./Search.scss";

const Search = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(true);
  const inputRef = useRef();

  const debouncedValue = useDebounce(500, searchValue);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await request.get(
          `products/?searchTerm=${debouncedValue}&active=false`,
          {
            headers: {
              Authorization: `Bearer ${user}`,
            },
          }
        );
        setSearchResult(res.data.items);
        setShowResult(true);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [debouncedValue, user]);

  const handleSearch = () => {
    dispatch(getSearchTerm(searchValue));
    setShowResult(false);
  };

  const handleChangeInput = (e) => {
    const value = e.target.value;
    if (value.startsWith(" ")) {
      return;
    }
    setSearchValue(value);
  };

  const handleClear = () => {
    setSearchValue("");
    dispatch(getSearchTerm(""));
  };

  const handleHideResult = () => {
    setShowResult(false);
  };
  return (
    <Tippy
      onClickOutside={handleHideResult}
      placement="bottom"
      interactive
      visible={showResult && debouncedValue.length > 0}
      render={(attrs) => (
        <div className="search--result" tabIndex="-1" {...attrs}>
          <PopperWrapper>
            <h4 className="search--result__title">{t("searchBox.result")}</h4>
            {searchResult?.map((product) => (
              <SearchItem key={product.id} product={product} />
            ))}
            {searchResult.length > 0 ? (
              <h4 className="search--result__all">
                <Link
                  to="/result"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  {t("searchBox.more")}
                  {` "${debouncedValue}"`}
                </Link>
              </h4>
            ) : (
              <h4 to="/result" className="search--result__all">
                {t("searchBox.noResult")}
                {` "${debouncedValue}"`}
              </h4>
            )}
          </PopperWrapper>
        </div>
      )}
    >
      <div className="header--search__group">
        <div className="header--search__input">
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            onChange={handleChangeInput}
            placeholder={t("searchBox.search")}
          />

          {debouncedValue && !loading && (
            <FontAwesomeIcon
              className="clear"
              icon={faCircleXmark}
              onClick={handleClear}
            />
          )}
          {loading && user && (
            <FontAwesomeIcon className="loading" icon={faSpinner} />
          )}
          <div className="header--search__icon" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
      </div>
    </Tippy>
  );
};

export default Search;
