import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Button from "~/components/Button/Button";
import logo from "~/assets/images/svg/logo.svg";

import "./HeaderAuth.scss";

const HeaderAuth = () => {
  const url = useLocation();
  const { t } = useTranslation();
  return (
    <div className="header-auth">
      <div className="header-auth--logo">
        <div className="header-auth--logo__img">
          <Button to="/">
            <img src={logo} alt="logo" />
          </Button>
          <Link to="/" className="header-auth--logo__name">
            TDH
          </Link>
        </div>
        <p className="header-auth--logo__register">
          {url.pathname === "/register" ? t("auth.register") : t("auth.login")}
        </p>
      </div>
      <p className="header-auth--help">{t("auth.help")}</p>
    </div>
  );
};

export default HeaderAuth;
