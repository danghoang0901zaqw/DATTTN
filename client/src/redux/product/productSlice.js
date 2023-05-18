import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  products: localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    getProducts: (state, action) => {
      state.products = action.payload;
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    removeProducts: (state, action) => {
      state.products = [];
      localStorage.setItem("products", JSON.stringify(state.products));
    },
  },
});
export const { getProducts, removeProducts, getSearchTerm } =
  productSlice.actions;
export default productSlice.reducer;
