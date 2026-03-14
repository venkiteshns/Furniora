import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  reducers: {
    addItemToCart: (state, action) => {
      const item = action.payload;
      const isExist = state.cartItems.find((x) => x._id === item._id);

      if (!isExist) {
        state.cartItems = [...state.cartItems, item];
      }else{
        state.cartItems = state.cartItems.map((x) => x._id === isExist._id ? item : x)
      }
      
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      console.log("pay ",action.payload);
      
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload,
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", state.cartItems);
    },
  },
});

export const { addItemToCart, removeFromCart, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;
