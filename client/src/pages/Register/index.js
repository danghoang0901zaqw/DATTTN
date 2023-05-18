import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import facebook from "~/assets/images/svg/facebook.svg";
import google from "~/assets/images/svg/google.svg";

import Button from "~/components/Button/Button";
import request from "~/utils/httpRequest";

import "./Register.scss";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().required(t("register.usernameError")),
    fullname: yup.string().required(t("register.fullnameError")),
    email: yup
      .string()
      .required(t("register.emailError"))
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        t("register.emailInvalid")
      ),
    password: yup
      .string()
      .min(8, t("register.passwordLengthInvalid"))
      .max(20, t("register.passwordLengthInvalid"))
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/,
        t("register.passwordInvalid")
      )
      .required(t("register.passwordError")),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], t("register.confirmPasswordInvalid"))
      .required(t("register.confirmPasswordError")),
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
      await request.post("users", data);
      toast.success(t("register.registerSuccess"));
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div className="register">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        theme="dark"
      />
      <div className="register--heading">
        <h1 className="register--heading__title">TDH</h1>
        <p className="register--heading__desc">{t("register.title")}</p>
      </div>
      <form className="form" onSubmit={handleSubmitForm}>
        <div className="register--way">
          <h1 className="register--way__title">TDH</h1>
          <div className="register--way__content">
            <div className="register--way__box"> {t("register.loginQR")}</div>
            <svg width="40" height="40" fill="none" className="sYzQJQ">
              <g clipPath="url(#clip0)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18 0H0v18h18V0zM3 15V3h12v12H3zM18 22H0v18h18V22zm-3 15H3V25h12v12zM40 0H22v18h18V0zm-3 15H25V3h12v12z"
                  fill="#6f86d6"
                ></path>
                <path d="M37 37H22.5v3H40V22.5h-3V37z" fill="#6f86d6"></path>
                <path
                  d="M27.5 32v-8h-3v8h3zM33.5 32v-8h-3v8h3zM6 6h6v6H6zM6 28h6v6H6zM28 6h6v6h-6z"
                  fill="#6f86d6"
                ></path>
                <path fill="#fff" d="M-4.3 4l44 43.9-22.8 22.7-43.9-44z"></path>
              </g>
              <defs>
                <clipPath id="clip0">
                  <path fill="#fff" d="M0 0h40v40H0z"></path>
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className="form--group">
          <input
            type="text"
            placeholder={t("register.username")}
            name="username"
            {...register("username")}
          />
        </div>
        {errors.username && (
          <p className="message--error">{errors.username.message}</p>
        )}
        <div className="form--group">
          <input
            type="text"
            placeholder={t("register.fullname")}
            name="fullname"
            {...register("fullname")}
          />
        </div>
        {errors.fullname && (
          <p className="message--error">{errors.fullname.message}</p>
        )}
        <div className="form--group">
          <input
            type="text"
            placeholder={t("register.email")}
            name="email"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="message--error">{errors.email.message}</p>
        )}

        <div className="form--group">
          <input
            type="password"
            placeholder={t("register.password")}
            name="password"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <p className="message--error">{errors.password.message}</p>
        )}

        <div className="form--group">
          <input
            type="password"
            placeholder={t("register.confirmPassword")}
            name="confirm_password"
            {...register("confirm_password")}
          />
        </div>
        {errors.confirm_password && (
          <p className="message--error">{errors.confirm_password.message}</p>
        )}

        <div className="btn--group">
          <Button
            className={"btn primary full large"}
            onClick={handleSubmitForm}
          >
            {t("register.register")}
          </Button>
          <div className="btn--group__social">
            <Button className={"btn rounded full"}>
              <img src={facebook} alt="facebook" />
              Facebook
            </Button>
            <Button className={"btn rounded full"}>
              <img src={google} alt="google" />
              Google
            </Button>
          </div>
        </div>
        <div className="form--help">
          <div className="form--help__text">
            <p> {t("register.hasAccount")}</p>
            <Button className={"btn outline"} to="/login">
              {t("register.login")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
