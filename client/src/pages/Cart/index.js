import { useDispatch, useSelector } from "react-redux";
import "./Cart.scss";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { CartPageProduct } from "~/Layouts/components/Cart";
import Button from "~/components/Button/Button";
import { deleteCart } from "~/redux/cart/cartSlice";
import formarNum from "~/utils/formatNumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Cart = () => {
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const navigate = useNavigate();
  const [isCheckout, setIsCheckout] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleDeleteCart = () => {
    dispatch(deleteCart());
  };
  const totalPayment = useMemo(() => {
    return cartProducts.reduce(
      (total, cur) => (total += cur.price * cur.quantity),
      0
    );
  }, [cartProducts]);
  const handleBuyNow = () => {
    if (!cartProducts.length){
      toast.error(t("cart.toastEmpty"));
      return
    };
    setIsCheckout(true);
    dispatch(deleteCart());
  };
  const handleShoppingNow = () => {
    navigate("/");
  };
  return isCheckout ? (
    <div className="success">
      <div className="success--wrap">
        <FontAwesomeIcon icon={faCheckCircle} color="green" size="4x" />
        <p className="success--text">{t("cart.buySuccess")} </p>
      </div>
      <Button onClick={handleShoppingNow} className={"btn primary"}>
      {t("cart.continueBuy")}
      </Button>
    </div>
  ) : (
    <div className="cartpage">
       <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        theme="dark"
      />
      <div className="cartpage--heading">
        <div className="cartpage--heading__image">Hình ảnh</div>
        <div className="cartpage--heading__product">{t("cart.product")}</div>
        <div className="cartpage--heading__price">{t("cart.price")}</div>
        <div className="cartpage--heading__quan">{t("cart.quantity")}</div>
        <div className="cartpage--heading__money">{t("cart.total")}</div>
        <div className="cartpage--heading__action">{t("cart.action")}</div>
      </div>
      <div className="cartpage--container">
        {cartProducts.length > 0 ? (
          cartProducts?.map((product) => (
            <CartPageProduct product={product} key={product.id} />
          ))
        ) : (
          <div className="cartpage--content__empty">
            <p>{t("cart.noProduct")}</p>
          </div>
        )}
      </div>
      <div className="cartpage--footer">
        <p>
          {t("cart.totalPayment")} ({cartProducts.length}) {t("cart.item")}
        </p>
        <span>₫{formarNum(totalPayment)}</span>
        <Button onClick={handleBuyNow} className={"btn primary"}>
          {t("cart.buy")}
        </Button>
        <Button onClick={handleDeleteCart} className={"btn outline"}>
          {t("cart.removeAll")}
        </Button>
      </div>
    </div>
  );
};

export default Cart;
