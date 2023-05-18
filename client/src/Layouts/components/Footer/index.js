import { useTranslation } from "react-i18next";

import { download, express, follow, pay } from "~/assets/images/png";

import "./Footer.scss";
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer-auth">
      <div className="footer-auth--content">
        <div className="footer-auth--group">
          <h5 className="footer-auth--group__title">{t("footer.customer")}</h5>
          <ul className="footer-auth--group__list">
            <li className="footer-auth--group__item">Trung Tâm Trợ Giúp</li>
            <li className="footer-auth--group__item">TDH Blog</li>
            <li className="footer-auth--group__item">TDH Mall</li>
            <li className="footer-auth--group__item">Hướng Dẫn Mua Hàng</li>
            <li className="footer-auth--group__item">Hướng Dẫn Bán Hàng</li>
            <li className="footer-auth--group__item">TDH Xu</li>
            <li className="footer-auth--group__item">Vận Chuyển</li>
            <li className="footer-auth--group__item">Trả Hàng & Hoàn Tiền</li>
            <li className="footer-auth--group__item">Chăm Sóc Khách Hàng</li>
            <li className="footer-auth--group__item">Chính Sách Bảo Hành</li>
          </ul>
        </div>
        <div className="footer-auth--group">
          <h5 className="footer-auth--group__title">{t("footer.about")}</h5>
          <ul className="footer-auth--group__list">
            <li className="footer-auth--group__item">
              Giới Thiệu Về TDH Việt Nam
            </li>
            <li className="footer-auth--group__item">Tuyển Dụng</li>
            <li className="footer-auth--group__item">TDH Mall</li>
            <li className="footer-auth--group__item">Điều Khoản TDH</li>
            <li className="footer-auth--group__item">Hướng Dẫn Bán Hàng</li>
            <li className="footer-auth--group__item">Chính Sách Bảo Mật</li>
            <li className="footer-auth--group__item">Chính Hãng</li>
            <li className="footer-auth--group__item">Kênh Người Bán</li>
            <li className="footer-auth--group__item">Flash Sales</li>
            <li className="footer-auth--group__item">
              Chương Trình Tiếp Thị Liên Kết TDH
            </li>
            <li className="footer-auth--group__item">
              Liên Hệ Với Truyền Thông
            </li>
          </ul>
        </div>
        <div className="footer-auth--group">
          <div>
            <h5 className="footer-auth--group__title">{t("footer.pay")}</h5>
            <ul className="footer-auth--group__list footer-auth--group__pay">
              <li className="footer-auth--group__item">
                <img src={pay.visa} alt="visa" />
              </li>
              <li className="footer-auth--group__item">
                <img src={pay.jp} alt="jp" />
              </li>
              <li className="footer-auth--group__item">
                <img src={pay.jcb} alt="jcb" />
              </li>
              <li className="footer-auth--group__item">
                <img src={pay.americanExpress} alt="american-express" />
              </li>
              <li className="footer-auth--group__item">
                <img src={pay.cod} alt="cod" />
              </li>
              <li className="footer-auth--group__item">
                <img src={pay.installment} alt="installment" />
              </li>
              <li className="footer-auth--group__item">
                <img src={pay.sPay} alt="s-pay" />
              </li>
              <li className="footer-auth--group__item">
                <img src={pay.payLater} alt="pay-later" />
              </li>
            </ul>
          </div>
          <div>
            <h5 className="footer-auth--group__title">
              {t("footer.logistics")}
            </h5>
            <ul className="footer-auth--group__list footer-auth--group__express">
              <li className="footer-auth--group__item">
                <img src={express.sExpress} alt="s-express" />
              </li>
              <li className="footer-auth--group__item">
                <img src={express.ghtk} alt="ghtk" />
              </li>
              <li className="footer-auth--group__item">
                <img src={express.ghn} alt="ghn" />
              </li>
              <li className="footer-auth--group__item">
                <img src={express.viettel} alt="viettel" />
              </li>
              <li className="footer-auth--group__item">
                <img src={express.vienamPost} alt="vienam-post" />
              </li>
              <li className="footer-auth--group__item">
                <img src={express.jtExpress} alt="jt-express" />
              </li>
              <li className="footer-auth--group__item">
                <img src={express.grabExpress} alt="grab-express" />
              </li>
              <li className="footer-auth--group__item">
                <img src={express.ninja} alt="ninja" />
              </li>
              <li className="footer-auth--group__item">
                <img src={express.bestExpress} alt="best-express" />
              </li>
              <li className="footer-auth--group__item">
                <img src={express.be} alt="" />
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-auth--group">
          <h5 className="footer-auth--group__title">{t("footer.follow")}</h5>
          <ul className="footer-auth--group__list">
            <li className="footer-auth--group__item">
              <img src={follow.facebook} alt="facebook" />
              <span>Facebook</span>
            </li>
            <li className="footer-auth--group__item">
              <img src={follow.instagram} alt="instagram" />
              <span>Instagram</span>
            </li>
            <li className="footer-auth--group__item">
              <img src={follow.linkedin} alt="linkedin" />
              <span>LinkedIn</span>
            </li>
          </ul>
        </div>
        <div className="footer-auth--group">
          <h5 className="footer-auth--group__title">{t("footer.download")}</h5>
          <ul className="footer-auth--group__list footer-auth--download ">
            <li className="footer-auth--group__item footer-auth--download__item">
              <img src={download.qr} alt="qr" />
            </li>
            <ul>
              <li>
                <img src={download.appstore} alt="app-store" />
              </li>
              <li>
                <img src={download.googleplay} alt="google-play" />
              </li>
              <li>
                <img src={download.appgallery} alt="app-gallery" />
              </li>
            </ul>
          </ul>
        </div>
      </div>
      <div className="footer-auth--coppyright">
        <div className="footer-auth--coppyright__heading">
          <p>{t("footer.coppyright")}</p>
          <p>{t("footer.country")}</p>
        </div>
        <ul className="footer-auth--coppyright__policy">
          <li>{t("footer.policy")}</li>
          <li>{t("footer.service")}</li>
          <li>{t("footer.shipping")}</li>
          <li>{t("footer.violation")}</li>
        </ul>
        <div className="footer-auth--coppyright__address">
          <p className="footer-auth--coppyright__title">Công ty TNHH TDH</p>
          <div className="footer-auth--coppyright__desc">
            <p>
            {t("footer.address")}
            </p>
            <p>{t("footer.phone")}</p>
            <p>
            {t("footer.responsibility")}
            </p>
            <p>
            {t("footer.businessCode")}
            </p>
            <p>{t("footer.license")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
