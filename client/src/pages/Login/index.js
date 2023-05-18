import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Button from "~/components/Button/Button";
import { loginAcc } from "~/redux/auth/authSlice";
import * as request from "~/utils/httpRequest";

import "./Login.scss";

const Login = () => {
  const notifyRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [rememberMe, setRememberMe] = useState(false);

  const schema = yup.object().shape({
    username: yup.string().required("Tên đăng nhập không được để trống"),
    password: yup.string().required("Mật khẩu không được để trống"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: {
      onChange: true,
      onBlur: true,
    },
    resolver: yupResolver(schema),
  });
  const handleSubmitForm = handleSubmit(async (data) => {
    try {
      const res = await request.post("auth/users", data);
      toast.success(t("login.loginSuccess"));
      dispatch(loginAcc(res.accessToken));
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(res.accessToken));
      }
      setTimeout(() => {
        navigate("/");
      }, 500);
      localStorage.setItem(
        "expirationDate",
        JSON.stringify(new Date(new Date().getTime() + 30 * 60 * 1000))
      );
    } catch (error) {
      notifyRef.current.style.display = "flex";
      console.log(error);
    }
  });
  return (
    <div className="login">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        theme="dark"
      />
      <div className="login--heading">
        <h1 className="login--heading__title">TDH</h1>
        <p className="login--heading__desc">{t("login.title")}</p>
      </div>
      <div className="login--content">
        <form onSubmit={handleSubmitForm} className="form">
          <h1 className="form--heading"> {t("login.login")}</h1>
          <div ref={notifyRef} className="error">
            <FontAwesomeIcon icon={faCircleXmark} color="#fe2c55" />
            <p className="error--message">{t("login.notifyMessage")}</p>
          </div>
          <div className="form--group">
            <input
              type="text"
              {...register("username")}
              placeholder={t("login.username")}
            />
          </div>
          {errors.username && (
            <p className="message--error">{errors.username.message}</p>
          )}
          <div className="form--group">
            <input
              type="password"
              {...register("password")}
              placeholder={t("login.password")}
            />
          </div>
          {errors.password && (
            <p className="message--error">{errors.password.message}</p>
          )}
          <div className="remember">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Ghi nhớ đăng nhập
          </div>
          <div className="btn--group">
            <Button
              onClick={handleSubmitForm}
              className={"btn primary large full"}
            >
              {t("login.login")}{" "}
            </Button>
            <Button className={"btn outline"}>
              {t("login.forgetPassword")}
            </Button>
            <Button className={"btn"} to={"/register"}>
              {t("login.createAccount")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
