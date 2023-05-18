import { useState } from "react";

import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faBell, faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faCartShopping,
  faChevronDown,
  faChevronUp,
  faClose,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link, useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { logoutAcc } from "~/redux/auth/authSlice";
import { deleteCart } from "~/redux/cart/cartSlice";
import { getLanguage } from "~/redux/language/languageSlice";
import { removeProducts } from "~/redux/product/productSlice";

import { header } from "~/assets/images/png";
import avatar from "~/assets/images/png/header/avt.jpeg";
import { CartEmpty, CartList } from "../Cart";
import Search from "../Search";

import logo from '~/assets/images/svg/logo.svg'

import "./Header.scss";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const language = useSelector((state) => state.language.language);
  const cartItems = useSelector((state) => state.cart.cartProducts);

  const [opened, setOpened] = useState(false);
  const [hideOptionLan, setHideOptionLan] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const handleLogOut = () => {
    dispatch(logoutAcc());
    dispatch(removeProducts());
    dispatch(deleteCart());
    localStorage.removeItem("expirationDate");
    navigate("/login");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
    dispatch(getLanguage(language));
    setOpened(false);
  };
  const handleToggleOptionLan = () => {
    setHideOptionLan(!hideOptionLan);
  };

  return (
    <header className="header">
      <nav className="header-nav">
        <div className="header-nav--left">
          <ul className="header-nav--left__list">
            <li className="header-nav--left__item">{t("navbar.seller")}</li>
            <li className="header-nav--left__item">{t("navbar.become")}</li>
            <li className="header-nav--left__item download">
              {t("navbar.download")}
              <div className="download--group">
                <img src={header.qrapp} alt="qr" />
                <div className="download--group__list">
                  <div className="download--group__item">
                    <img src={header.storeapp} alt="app-store" />
                  </div>
                  <div className="download--group__item">
                    <img src={header.playgoogle} alt="google-play" />
                  </div>
                  <div className="download--group__item">
                    <img src={header.galleryapp} alt="app-gallery" />
                  </div>
                </div>
              </div>
            </li>
            <li className="header-nav--left__item">
              <div className="header-nav--left__connect">
                <p>{t("navbar.folow")}</p>
                <FontAwesomeIcon icon={faFacebook} color="white" />
                <FontAwesomeIcon icon={faInstagram} color="white" />
              </div>
            </li>
          </ul>
        </div>
        <div className="header-nav--right">
          <ul className="header-nav--right__list">
            <li className="header-nav--right__item notify">
              <FontAwesomeIcon icon={faBell} />
              <p>{t("navbar.notify")}</p>
              <div className="notify--option">
                <div className="notify--option__heading">
                  <img src={header.notify} alt="notify" />
                  <p>
                    {user
                      ? t("navbar.titleNotifyLogin")
                      : t("navbar.titleNotifyLogout")}
                  </p>
                </div>
                {!user && (
                  <div className="notify--btn__group">
                    <Link to="/register">{t("navbar.signup")}</Link>
                    <Link to="/login">{t("navbar.login")}</Link>
                  </div>
                )}
              </div>
            </li>
            <li className="header-nav--right__item">
              <FontAwesomeIcon icon={faQuestionCircle} />
              <p>{t("navbar.help")}</p>
            </li>
            <li className="header-nav--right__item language">
              <FontAwesomeIcon icon={faGlobe} />
              <p>{language === "vi" ? t("navbar.vi") : t("navbar.en")}</p>
              <FontAwesomeIcon icon={faChevronDown} />
              <div className="language--option">
                <p
                  className="language--option__type"
                  onClick={() => handleChangeLanguage("vi")}
                >
                  {t("navbar.vi")}
                </p>
                <p
                  className="language--option__type"
                  onClick={() => handleChangeLanguage("en")}
                >
                  {t("navbar.en")}
                </p>
              </div>
            </li>
            {user ? (
              <li className="header-nav--right__item header-nav--right__item-user">
                <img src={avatar} alt="avatar" />
                <p>{user.substr(0, 10)}</p>
                <ul className="header-nav--right__item-option">
                  <li>{t("navbar.account")}</li>
                  <Link to="/cart">
                    <li>{t("navbar.purchase")}</li>
                  </Link>
                  <Link to="/admin">
                    <li>{t("navbar.manager")}</li>
                  </Link>
                  <li onClick={handleLogOut}>{t("navbar.logout")}</li>
                </ul>
              </li>
            ) : (
              <li className="header-nav--right__item">
                <Link to="/register">{t("navbar.signup")}</Link>
                <Link to="/login">{t("navbar.login")}</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <div className="header--search">
        <div className="header--search__bars" onClick={() => setOpened(true)}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className={opened ? `overlay__active` : "overlay"}>
          <div className="modal">
            <ul className="menu--list">
              <li className="menu--item">
                <Link
                  to="/"
                  onClick={() => {
                    setOpened(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {t("navbar.home")}
                </Link>
              </li>
              <li className="menu--item">
                <Link
                  to="/admin"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  {t("navbar.manager")}
                </Link>
              </li>
              <li
                className="menu--item menu--item__language"
                onClick={handleToggleOptionLan}
              >
                <div className="menu--item__heading">
                  <p> {t("navbar.language")}</p>
                  {hideOptionLan ? (
                    <FontAwesomeIcon icon={faChevronDown} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronUp} />
                  )}
                </div>
                <div
                  className={
                    hideOptionLan
                      ? "menu--item__option"
                      : "menu--item__option-active"
                  }
                >
                  <p
                    className="language--option__type"
                    onClick={() => handleChangeLanguage("vi")}
                  >
                    {t("navbar.vi")}
                  </p>
                  <p
                    className="language--option__type"
                    onClick={() => handleChangeLanguage("en")}
                  >
                    {t("navbar.en")}
                  </p>
                </div>
              </li>
              {user ? (
                <li className="menu--item" onClick={handleLogOut}>
                  {t("navbar.logout")}
                </li>
              ) : (
                <>
                  <li className="menu--item">
                    <Link to="/login">{t("navbar.login")} </Link>
                  </li>
                  <li className="menu--item">
                    <Link to="/register">{t("navbar.signup")}</Link>
                  </li>
                </>
              )}
            </ul>
            <div className="menu--close" onClick={() => setOpened(false)}>
              <FontAwesomeIcon icon={faClose} />
            </div>
          </div>
        </div>
        <Link
          to="/"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          <div className="header--search__logo">
            <img src={logo} alt="logo"/>
            <p className="header--search__logo-text">TDH</p>
          </div>
        </Link>
        <Search />
        <div className="header--cart">
          <FontAwesomeIcon icon={faCartShopping} />
          {cartItems.length > 0 && (
            <div className="header--cart__quantity">{cartItems.length}</div>
          )}
          {cartItems.length > 0 ? <CartList /> : <CartEmpty />}
        </div>
        {user && (
          <li className="header-nav--right__item header-nav--right__item-user user">
            <img src={avatar} alt="avatar" />
          </li>
        )}
      </div>
    </header>
  );
};

export default Header;
