import { faHeart, faStarHalfStroke } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import formarNum from "~/utils/formatNumber";

import "./Product.scss";

const Product = ({ product }) => {
  const { t } = useTranslation();
  return (
    <Link
      to={`/products/${product.id}`}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className="home--product__wrapper"
    >
      <div className="home--products__item">
        <div className="home--products__item-img">
          <img
            src={
              product.ProductImage[0]?.url
                ? `http://${product.ProductImage[0]?.url}`
                : "https://down-vn.img.susercontent.com/file/vn-11134201-23020-hauu1kcwbrnvf8"
            }
            alt={product.id}
          />
        </div>
        <div className="home--product__info">
          <h5 className="home--product__name">{product.name}</h5>
          <p className="home--product__desc">{product.description}</p>
          <div className="home--product__price">
            <span className="home--product__price-old">
              {formarNum(product.price + 192)}đ
            </span>
            <span className="home--product__price-new">
              {formarNum(product.price)}đ
            </span>
          </div>
          <div className="home--product__action">
            <span className="home--product__like ">
              <FontAwesomeIcon icon={faHeart} />
            </span>
            <div className="home--product__rate">
              <div className="home--product__vote">
                <FontAwesomeIcon icon={faStarHalfStroke} />
                <FontAwesomeIcon icon={faStarHalfStroke} />
                <FontAwesomeIcon icon={faStarHalfStroke} />
                <FontAwesomeIcon icon={faStarHalfStroke} />
                <FontAwesomeIcon icon={faStarHalfStroke} />
              </div>
              <span className="home--product__sold">
                {product.id} {t("product.sold")}
              </span>
            </div>
          </div>
          <div className="home--product__origin">
            <span className="home--product__brand">Appscyclone</span>
            <span className="home--product__origin-name">
              {t("product.vi")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
