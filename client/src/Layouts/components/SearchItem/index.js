import React from "react";
import { Link } from "react-router-dom";

import formarNum from "~/utils/formatNumber";

import "./SearchItem.scss";

const SearchItem = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`}>
      <div className="search--item">
        <div className="search--item__img">
          <img
            src={
              product?.ProductImage[0]?.url
                ? `http://${product?.ProductImage[0]?.url}`
                : "https://down-vn.img.susercontent.com/file/vn-11134201-23020-hauu1kcwbrnvf8"
            }
            alt="img"
          />
        </div>
        <div className="search--item__info">
          <div className="search--item__wrap">
            <p className="search--item__name">{product.name}</p>
            <p className="search--item__desc">{product.description}</p>
          </div>
          <p className="search--item__price">đ{formarNum(product.price)}</p>
        </div>
      </div>
    </Link>
  );
};

export default SearchItem;
