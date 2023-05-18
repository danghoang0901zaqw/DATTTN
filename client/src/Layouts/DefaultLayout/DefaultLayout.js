import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import FooterAuth from "../components/Footer";
import Header from "../components/Header";

import "./DefaultLayout.scss";
import { useNavigate } from "react-router-dom";

const DefaultLayout = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleGoToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("user");
    const expirationDate = localStorage.getItem("expirationDate");

    if (token && new Date() > new Date(expirationDate)) {
      localStorage.removeItem("user");
      localStorage.removeItem("expirationDate");
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Header />
      {children}
      <FooterAuth />
      {scrolled && (
        <div className="arrow--up" onClick={handleGoToTop}>
          <FontAwesomeIcon icon={faArrowUp} color="#6f86d6" />
        </div>
      )}
    </div>
  );
};

export default DefaultLayout;
