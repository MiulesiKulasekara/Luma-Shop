import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const spinnerSlice = createSlice({
  name: "spinner",
  initialState,
  reducers: {
    showSpinner: (state) => {
      state.isLoading = true;
    },
    hideSpinner: (state) => {
      state.isLoading = false;
    },
  },
});

export const { showSpinner, hideSpinner } = spinnerSlice.actions;
export default spinnerSlice;
