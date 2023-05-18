import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalQuantity: 0,
  cartProducts: localStorage.getItem("cart-items")
    ? JSON.parse(localStorage.getItem("cart-items"))
    : [],
};
const productSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems: (state, action) => {
      const newItem = action.payload;
      const indexExist = state.cartProducts.findIndex((x) => {
        return x.id === newItem.id;
      });
      if (indexExist >= 0) {
        state.cartProducts[indexExist] = {
          ...state.cartProducts[indexExist],
          quantity: (state.cartProducts[indexExist].quantity +=
            +newItem.quantity),
        };
      } else {
        state.cartProducts = [...state.cartProducts, newItem];
      }
      localStorage.setItem("cart-items", JSON.stringify(state.cartProducts));
    },
    changeQuanItem: (state, action) => {
      const newItem = action.payload;
      const indexExist = state.cartProducts.findIndex((x) => {
        return x.id === newItem.id;
      });
      if (indexExist >= 0) {
        state.cartProducts[indexExist] = {
          ...state.cartProducts[indexExist],
          quantity: (state.cartProducts[indexExist].quantity =
            newItem.quantity),
        };
      } else {
        state.cartProducts = [...state.cartProducts, newItem];
      }
      localStorage.setItem("cart-items", JSON.stringify(state.cartProducts));
    },
    removeItems: (state, action) => {
      const itemIndex = action.payload;
      state.cartProducts = state.cartProducts.filter((x) => {
        return x.id !== itemIndex;
      });
      localStorage.setItem("cart-items", JSON.stringify(state.cartProducts));
    },
    increaseItem: (state, action) => {
      const increaseItem = action.payload;
      const indexItem = state.cartProducts.findIndex((x) => {
        return x.id === increaseItem.id;
      });
      state.cartProducts[indexItem].quantity += 1;
      localStorage.setItem("cart-items", JSON.stringify(state.cartProducts));
    },
    decreaseItem: (state, action) => {
      const decreaseItem = action.payload;
      const indexItem = state.cartProducts.findIndex((x) => {
        return x.id === decreaseItem.id;
      });
      state.cartProducts[indexItem].quantity === 1
        ? (state.cartProducts[indexItem].quantity = 1)
        : (state.cartProducts[indexItem].quantity -= 1);
      localStorage.setItem("cart-items", JSON.stringify(state.cartProducts));
    },
    deleteCart: (state, action) => {
      state.cartProducts = [];
      localStorage.setItem("cart-items", JSON.stringify(state.cartProducts));
    },
  },
});
export const { addItems, removeItems, increaseItem, decreaseItem, deleteCart,changeQuanItem } =
  productSlice.actions;
export default productSlice.reducer;
