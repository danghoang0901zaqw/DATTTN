import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { removeItems } from "~/redux/cart/cartSlice";
import formarNum from "~/utils/formatNumber";

import "./CartItem.scss";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleRemoveItem = (id) => {
    dispatch(removeItems(id));
  };
  return (
    <div className="cart--content__item">
      <img
        src="https://down-vn.img.susercontent.com/file/e1f00c1b371328527b522a741ae6c87e_tn"
        alt="img"
      />
      <div className="cart--content__info">
        <p className="cart--content__name">{item.name}</p>
        <p className="cart--content__desc">{item.description}</p>
      </div>
      <div className="cart--content__wrap">
        <div className="cart--content__detail">
          <span className="cart--content__price">{formarNum(item.price)}₫</span>
          <span className="cart--content__multiple">x</span>
          <span className="cart--content__quantity">{item.quantity}</span>
        </div>
        <div
          className="cart--content__remove"
          onClick={() => handleRemoveItem(item.id)}
        >
         {t('searchBox.remove')}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
