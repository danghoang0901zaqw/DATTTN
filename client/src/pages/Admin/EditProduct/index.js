import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import request from "~/utils/httpRequest";

import "./EditProduct.scss";

const EditProduct = () => {
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
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: {
      onChange: true,
      onBlur: true,
    },
    resolver: yupResolver(schema),
  });

  const { id } = useParams();
  const [productEdit, setProductEdit] = useState();
  const [images, setImages] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    const getSingleProduct = async () => {
      const res = await request.get(`products/${id}`, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      setProductEdit(res.data);
      setImages(res.data.ProductImage);
      const formInfo = res.data;
      setValue("name", formInfo.name);
      setValue("price", formInfo.price);
      setValue("description", formInfo.description);
      setValue("active", formInfo.active);
    };
    getSingleProduct();
  }, [id]);

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
  const handleEdit = handleSubmit(async (data) => {
    try {
      const imageString = images.map((image) => image.url);
      data.images = imageString;
      await request.put(`/products/${id}`, data, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      toast.success("Chỉnh sửa sản phẩm thành công");
      navigate("/admin");
    } catch (error) {
      console.log(error);
      toast.error("Chỉnh sửa sản phẩm thất bại");
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
      <form method="POST" className="form" id="form" onSubmit={handleEdit}>
        <h3 className="heading">Chỉnh sửa sản phẩm</h3>
        <p className="desc"></p>
        <div className="spacer" />
        <div className="form--group">
          <label htmlFor="name" className="form--label">
            Tên sản phẩm
          </label>
          <input
            defaultValue={productEdit?.name}
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
            defaultValue={productEdit?.price}
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
            defaultValue={productEdit?.description}
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
        <div className="form--group form--group__checkbox">
          <label htmlFor="active" className="form--label">
            Is Active
          </label>
          <input
            defaultChecked={productEdit?.active}
            id="active"
            {...register("active")}
            type="checkbox"
            className="form--control"
          />
          <span className="form--message" />
        </div>
        <div className="form--group">
          <label htmlFor="file" className="form--label">
            Hình ảnh
          </label>
          <input
            id="file"
            accept="image/png, image/jpeg, image/jpg"
            type="file"
            onChange={handleChangeImage}
            className="form--control"
          />
          {errors.file && (
            <span className="form--message">{errors.file.message}</span>
          )}
        </div>
        <div className="images">
          {images?.map((image, index) => {
            return (
              <div key={index} className="images--content">
                <img src={`http://${image.url}`} alt="img-item" />
                <FontAwesomeIcon
                  icon={faClose}
                  onClick={() => handleRemoveImg(index)}
                />
              </div>
            );
          })}
        </div>

        <button className="form--submit" onClick={handleEdit}>
          Lưu
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
