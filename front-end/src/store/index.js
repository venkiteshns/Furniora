import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import cartReducer from "./cartSlice.js";
import productReducer from "./productSlice.js";
import userProductReducer from './userProductSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    userProducts: userProductReducer
  },
});

export default store;
