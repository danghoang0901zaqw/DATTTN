import { useState } from "react";
import { useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";

import {
  changeQuanItem,
  decreaseItem,
  increaseItem,
  removeItems,
} from "~/redux/cart/cartSlice";
import formarNum from "~/utils/formatNumber";

import "./CartPageProduct.scss";

const CartPageProduct = ({ product }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [quantity, setQuantity] = useState(product.quantity);

  const handlePreventText = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };
  const handleChangeQuan = (product) => {
    dispatch(
      changeQuanItem({
        ...product,
        quantity: Number(quantity) || 1,
      })
    );
  };
  const handleRemoveProduct = (id) => {
    dispatch(removeItems(id));
  };

  const handleChangeNum = (type) => {
    switch (type) {
      case "incre":
        setQuantity((prev) => +prev + 1);
        dispatch(
          increaseItem({
            ...product,
            quantity: Number(quantity),
          })
        );
        break;
      case "decre":
        setQuantity((prev) => (prev <= 1 ? 1 : prev - 1));
        dispatch(
          decreaseItem({
            ...product,
            quantity: Number(quantity),
          })
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="cartpage--content">
      <div className="cartpage--content__product">
        <img
          src={
            product.ProductImage[0]?.url
              ? `http://${product.ProductImage[0].url}`
              : "	https://down-vn.img.susercontent.com/file/vn-11134201-23020-hauu1kcwbrnvf8"
          }
          alt="img"
        />
        <p>{product.name}</p>
      </div>
      <div className="cartpage--content__price">
        <span> đ{formarNum(+product.price + 202)}</span>
        <span>đ{formarNum(product.price)}</span>
      </div>
      <div className="cartpage--content__quan">
        <div className="cartpage--content__quan-wrap">
          <div
            className="cartpage--content__quan-decre"
            onClick={() => handleChangeNum("decre")}
          >
            -
          </div>
          <div className="cartpage--content__quan-num">
            <input
              type="text"
              value={quantity || 1}
              onKeyPress={handlePreventText}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              onBlur={() => handleChangeQuan(product)}
            />
          </div>
          <div
            className="cartpage--content__quan-incre"
            onClick={() => handleChangeNum("incre")}
          >
            +
          </div>
        </div>
      </div>
      <div className="cartpage--content__money">
        đ{formarNum(product.price * product.quantity)}
      </div>
      <div
        className="cartpage--content__action"
        onClick={() => handleRemoveProduct(product.id)}
      >
        {t("cart.remove")}
      </div>
    </div>
  );
};

export default CartPageProduct;
