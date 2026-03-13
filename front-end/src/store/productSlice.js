import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setProductList: (state, action) => {
      ((state.products = action.payload), (state.status = "success"));
    },
    editProductList: (state, action) => {
      const item = action.payload;

      const index = state.products.findIndex((p) => p._id === item._id);

      if (index !== -1) {
        state.products[index] = item;
      }
    },
    setLoading: (state) => {
      state.status = "loading";
    },
    setError: (state, action) => {
      ((state.error = action.payload), (state.status = "failed"));
    },
  },
});

export const { setProductList, editProductList, setLoading, setError } =
  productSlice.actions;

export default productSlice.reducer;
