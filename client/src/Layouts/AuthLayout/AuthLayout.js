import React from "react";
import "./AuthLayout.scss";
import FooterAuth from "../components/Footer";
import HeaderAuth from "../components/HeaderAuth";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <HeaderAuth />
      {children}
      <FooterAuth />
    </div>
  );
};

export default AuthLayout;
