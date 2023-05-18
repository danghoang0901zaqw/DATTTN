import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: localStorage.getItem("language")
    ? JSON.parse(localStorage.getItem("language"))
    : "vi",
};
const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    getLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem("language", JSON.stringify(state.language));
    },
  },
});
export const { getLanguage } = languageSlice.actions;
export default languageSlice.reducer;
