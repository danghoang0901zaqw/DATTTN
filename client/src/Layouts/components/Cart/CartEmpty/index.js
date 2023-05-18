import { useTranslation } from "react-i18next";
import empty from "~/assets/images/png/header/cart-empty.png";

import "./CartEmpty.scss";

const CartEmpty = () => {
  const { t } = useTranslation();
  return (
    <div className="empty--content">
      <img src={empty} alt="empty-cart" />
      <p>{t("searchBox.titleCartEmpty")}</p>
    </div>
  );
};

export default CartEmpty;
