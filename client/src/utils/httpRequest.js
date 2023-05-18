import axios from "axios";

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, bearer = {}) => {
  const res = await request.get(path, bearer);
  return res.data;
};
export const post = async (path, options = {}, bearer = {}) => {
  const res = await request.post(path, options, bearer);
  return res.data;
};
export const put = async (path, options = {}, bearer = {}) => {
  const res = await request.put(path, options, bearer);
  return res.data;
};

export default request;
