import {
  faFacebook,
  faFacebookMessenger,
  faPinterest,
  faShopify,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faCartShopping,
  faStarHalfStroke,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "~/components/Button/Button";
import { addItems } from "~/redux/cart/cartSlice";
import formarNum from "~/utils/formatNumber";

import request from "~/utils/httpRequest";
import truncate from "~/utils/truncate";
import "./ProductDetail.scss";

const ProductDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [productDetail, setProductDetail] = useState();
  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const res = await request.get(`products/${id}`, {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        });
        setProductDetail(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleProduct();
  }, [id]);
  const [numberQuan, setNumberQuan] = useState(1);
  const [showMore, setShowMore] = useState(false);

  const handlePreventText = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };
  const handleChangeNum = (type) => {
    switch (type) {
      case "incre":
        setNumberQuan((prev) => prev + 1);
        break;
      case "decre":
        setNumberQuan((prev) => (prev <= 1 ? 1 : prev - 1));
        break;
      default:
        break;
    }
  };

  const handleAddToCart = (product) => {
    dispatch(
      addItems({
        ...product,
        quantity: +numberQuan,
      })
    );
    toast.success(t("searchBox.addCartSuccess"));
  };
  const handleBuyNowToCart = (product) => {
    navigate("/cart");
    dispatch(
      addItems({
        ...product,
        quantity: +numberQuan,
      })
    );
    toast.success(t("searchBox.addCartSuccess"));
  };
  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} theme="dark" />
      <div className="detail">
        <div className="detail--background">
          <div className="detail--img">
            <img
              className="detail--img__main"
              src={
                productDetail?.ProductImage[0]?.url
                  ? `http://${productDetail?.ProductImage[0]?.url}`
                  : "https://down-vn.img.susercontent.com/file/vn-11134201-23020-hauu1kcwbrnvf8"
              }
              alt="img-main"
            />
            <div className="detail--img__list">
              {productDetail?.ProductImage?.map((image) => (
                <img
                  key={image?.id}
                  className="detail--img__item"
                  src={`http://${image?.url}`}
                  alt="img-item"
                />
              ))}
            </div>
            <div className="detail--social">
              <div className="detail--social__share">
                <p className="detail--social__title">{t("detail.share")}</p>
                <ul className="detail--social__list">
                  <li className="detail--social__item">
                    <FontAwesomeIcon
                      icon={faFacebookMessenger}
                      color="#0584ff"
                    />
                  </li>
                  <li className="detail--social__item">
                    <FontAwesomeIcon icon={faFacebook} color="#3b5898" />
                  </li>
                  <li className="detail--social__item">
                    <FontAwesomeIcon icon={faPinterest} color="#df0316" />
                  </li>
                  <li className="detail--social__item">
                    <FontAwesomeIcon icon={faTwitter} color="#0ec2fe" />
                  </li>
                </ul>
              </div>
              <div className="detail--social__whist">
                <FontAwesomeIcon icon={faHeart} color="#48c6ef" />
                <p className="detail--social__title">
                  {t("detail.fav")} ({productDetail?.id})
                </p>
              </div>
            </div>
          </div>
          <div className="detail--content">
            <h4 className="detail--content__name">{productDetail?.name}</h4>
            <div className="detail--content__rating">
              <div className="detail--content__rating-wrap">
                <div className="detail--content__rating-vote">
                  <p className="detail--content__rating-desc">4.7</p>
                  <ul className="detail--content__rating-list">
                    <li>
                      <FontAwesomeIcon
                        icon={faStarHalfStroke}
                        color="#ffce3d"
                      />
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faStarHalfStroke}
                        color="#ffce3d"
                      />
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faStarHalfStroke}
                        color="#ffce3d"
                      />
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faStarHalfStroke}
                        color="#ffce3d"
                      />
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faStarHalfStroke}
                        color="#ffce3d"
                      />
                    </li>
                  </ul>
                </div>
                <div className="detail--content__rating-evaluate">
                  <p className="detail--content__rating-desc">
                    {formarNum(productDetail?.id + 54)}
                  </p>
                  <p className="detail--content__rating-title">
                    {t("detail.rating")}
                  </p>
                </div>
                <div className="detail--content__rating-sold">
                  <p className="detail--content__rating-desc">
                    {formarNum(productDetail?.id + 635)}
                  </p>
                  <p className="detail--content__rating-title">
                    {t("detail.sold")}
                  </p>
                </div>
              </div>
              <p className="detail--content__rating-report">
                {t("detail.report")}
              </p>
            </div>
            <div className="detail--content__price">
              <p>{formarNum(productDetail?.price + 121)}đ</p>
              <p>-</p>
              <p>{formarNum(productDetail?.price)}đ</p>
            </div>

            {productDetail?.description.length > 300 ? (
              <p className="detail--content__desc">
                {showMore
                  ? productDetail?.description
                  : truncate(productDetail?.description, 300)}
                <span
                  className="detail--content__desc-more"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? `${" "} Ẩn bớt` : "Xem Thêm"}
                </span>
              </p>
            ) : (
              <p className="detail--content__desc-more">
                {productDetail?.description}
              </p>
            )}
            <p className="detail--content__advert">{t("detail.slogan")}</p>
            <div className="detail--content__trans">
              <p className="detail--content__trans-title">{t("detail.ship")}</p>
              <div className="detail--content__trans-wrap">
                <FontAwesomeIcon icon={faTruck} color="#06c7a3" />
                <p>{t("detail.shipDesc")}</p>
              </div>
            </div>
            <div className="detail--content__quan">
              <p className="detail--content__quan-title">
                {t("detail.quantity")}
              </p>
              <div className="detail--content__quan-wrap">
                <div
                  className="detail--content__quan-decre"
                  onClick={() => handleChangeNum("decre")}
                >
                  -
                </div>
                <div className="detail--content__quan-num">
                  <input
                    type="text"
                    onKeyPress={handlePreventText}
                    value={numberQuan}
                    onChange={(e) =>
                      setNumberQuan(e.target.value <= 1 ? 1 : e.target.value)
                    }
                  />
                </div>
                <div
                  className="detail--content__quan-incre"
                  onClick={() => handleChangeNum("incre")}
                >
                  +
                </div>
              </div>
            </div>
            <div className="btn--group">
              <Button
                className={"btn outline"}
                onClick={() => handleAddToCart(productDetail)}
              >
                <FontAwesomeIcon icon={faCartShopping} />
                {t("detail.addCart")}
              </Button>
              <Button
                onClick={() => handleBuyNowToCart(productDetail)}
                className={"btn primary"}
              >
                {t("detail.buy")}{" "}
              </Button>
            </div>
            <div className="detail--content__commit">
              <div className="detail--content__commit-title">
                <FontAwesomeIcon icon={faShopify} color="#48c6ef" size="xl" />
                <p>{t("detail.guarantee")}</p>
              </div>
              <p className="detail--content__commit-desc">
                {t("detail.guaranteeDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
