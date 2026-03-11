import express from "express";
import {
  userLogin,
  userLogout,
  userSignup,
} from "../controllers/userController.js";
import {
  addProduct,
  addToCart,
  getProducts,
  getUserProducts,
} from "../controllers/productContoller.js";

const router = express.Router();

router.post("/user/login", userLogin);

router.post("/user/signup", userSignup);

router.get("/user/logout", userLogout);

router.get("/user/products", getProducts);

router.get("/user/products/:id", getUserProducts);

router.post("/user/add-product", addProduct);

router.post("/user/add_to_cart/:id", addToCart);

export default router;
