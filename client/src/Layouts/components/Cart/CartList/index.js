import { useMemo } from "react";
import { useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import Button from "~/components/Button/Button";

import formarNum from "~/utils/formatNumber";
import CartItem from "../CartItem";

import "./CartList.scss";

const CartList = () => {
  const cartItems = useSelector((state) => state.cart.cartProducts);
  const { t } = useTranslation();
  const totalPayment = useMemo(() => {
    return cartItems.reduce(
      (total, cur) => (total += cur.price * cur.quantity),
      0
    );
  }, [cartItems]);
  return (
    <div className="cart--content">
      <h4 className="cart--content__title">
        {" "}
        {t("searchBox.titleCartHeading")}
      </h4>
      <div className="cart--content__list">
        {cartItems?.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <p className="cart--content__total">
        {t("searchBox.total")}: <span>{formarNum(totalPayment)}đ</span>
      </p>
      <Button
        to="/cart"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className={"btn outline"}
      >
        {t("searchBox.viewCart")}
      </Button>
    </div>
  );
};

export default CartList;
