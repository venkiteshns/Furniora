import express from "express";
import {
  userLogin,
  userLogout,
  userSignup,
} from "../controllers/userController.js";
import {
  addProduct,
  addToCart,
  getCartProducts,
  getProducts,
  getUserProducts,
  handleCheckout,
  handleDeleteProduct,
  handleEditProduct,
  handleSoldProduct,
} from "../controllers/productContoller.js";

const router = express.Router();

router.post("/user/login", userLogin);

router.post("/user/signup", userSignup);

router.post("/user/logout", userLogout);

router.get("/user/products", getProducts);

router.get("/user/products/:id", getUserProducts);

router.post("/user/products", addProduct);

router.post("/user/cart/:id", addToCart);

router.put('/user/products/:id', handleEditProduct)

router.get("/user/cart_products/:id",getCartProducts);

router.delete('/user/products/:id', handleDeleteProduct)

router.patch('/user/products/:id/sold', handleSoldProduct)

router.post('/user/checkout', handleCheckout)

export default router;
