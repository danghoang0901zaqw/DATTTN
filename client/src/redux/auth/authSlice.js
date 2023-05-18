import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAcc: (state, action) => {
      state.user = action.payload;
    },
    logoutAcc(state, action) {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
});
export const { loginAcc, logoutAcc } = authSlice.actions;
export default authSlice.reducer;
