import { createSlice } from "@reduxjs/toolkit";

const userProductSlice = createSlice({
  name: "userProducts",
  initialState: {
    userProducts: localStorage.getItem("products")
      ? JSON.parse(localStorage.getItem("products"))
      : [],
  },
  reducers: {
    setUserProducts: (state, action) => {
      action.payload.forEach((product) => {
        const exists = state.userProducts.find((p) => p._id === product._id);

        if (!exists) {
          state.userProducts.push(product);
        }
      });
      localStorage.setItem("products", JSON.stringify(state.userProducts));
    },
    markItemAsSold: (state, action) => {
      if (typeof action.payload === "object") {
        action.payload.forEach((element) => {
          state.userProducts = state.userProducts.map((item) => {
            if (item._id === element) {
              item.isSold = true;
            }
            return item;
          });
        });
      } else {
        let _id = action.payload;
        state.userProducts = state.userProducts.map((item) => {
          if (item._id === _id) {
            item.isSold = true;
          }
          return item;
        });
      }
      localStorage.setItem("products", JSON.stringify(state.userProducts));
    },
    editProduct: (state, action) => {
      let item = action.payload;
      state.userProducts = state.userProducts.map((x) =>
        x._id === item._id ? item : x,
      );
      localStorage.setItem("products", JSON.stringify(state.userProducts));
    },
    clearProducts: (state) => {
      state.userProducts = [];
      localStorage.setItem("products",state.userProducts);
    }
  },
});

export const { markItemAsSold, setUserProducts, editProduct, clearProducts} =
  userProductSlice.actions;

export default userProductSlice.reducer;
