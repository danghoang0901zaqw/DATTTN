import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import request from "~/utils/httpRequest";

import "./AddProduct.scss";

const AddProduct = () => {
  const schema = yup.object().shape({
    name: yup.string().required("Tên sản phẩm không được để trống"),
    price: yup
      .number()
      .typeError("Giá sản phẩm phải là số")
      .required("Nhập giá sản phẩm")
      .positive("Giá sản phẩm phải là số dương"),
    description: yup.string().required("Hãy nhập mô tả sản phẩm"),
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

  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [images, setImages] = useState([]);

  const handleChangeImage = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      const res = await request.post("upload", formData, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      setImages((prev) => [...prev, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveImg = (id) => {
    const newImages = [...images].filter((image, index) => index !== id);
    setImages(newImages);
  };
  const handleAdd = handleSubmit(async (data) => {
    try {
      const imageString = images.map((image) => image.url);
      data.images = imageString;
      await request.post("/products", data, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      toast.success("Thêm sản phẩm thành công");
      navigate("/admin");
    } catch (error) {
      console.log(error);
      toast.error("Thêm sản phẩm thất bại");
    }
  });
  return (
    <div className="main">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        theme="dark"
      />
      <form method="POST" className="form" id="form" onSubmit={handleAdd}>
        <h3 className="heading">Thêm mới sản phẩm</h3>
        <p className="desc"></p>
        <div className="spacer" />
        <div className="form--group">
          <label htmlFor="name" className="form--label">
            Tên sản phẩm
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            placeholder="VD: Áo khoác"
            className="form--control"
          />
          {errors.name && (
            <span className="form--message">{errors.name.message}</span>
          )}
        </div>
        <div className="form--group">
          <label htmlFor="price" className="form--label">
            Giá sản phẩm
          </label>
          <input
            id="price"
            {...register("price")}
            type="text"
            className="form--control"
          />
          {errors.price && (
            <span className="form--message">{errors.price.message}</span>
          )}
        </div>
        <div className="form--group form--group__message">
          <label htmlFor="description" className="form--label">
            Mô tả sản phẩm
          </label>
          <textarea
            id="description"
            {...register("description")}
            cols="10"
            rows="20"
            className="form--control"
          />
          {errors.description && (
            <span className="form--message">{errors.description.message}</span>
          )}
        </div>
        <div className="form--group">
          <label htmlFor="image" className="form--label">
            Hình ảnh
          </label>
          <input
            id="image"
            onChange={handleChangeImage}
            type="file"
            accept="image/png,image/pjeg,image/jpg"
            className="form--control"
          />
          {errors.file && (
            <span className="form--message">{errors.file.message}</span>
          )}
        </div>
        <div className="images">
          {images.map((image, index) => (
            <div className="images--content" key={index}>
              <img src={`http://${image.url}`} alt="img-item" />
              <FontAwesomeIcon
                icon={faClose}
                onClick={() => handleRemoveImg(index)}
              />
            </div>
          ))}
        </div>
        <button className="form--submit" onClick={handleAdd}>
          Thêm sản phẩm
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
