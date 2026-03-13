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

router.get("/user/logout", userLogout);

router.get("/user/products", getProducts);

router.get("/user/products/:id", getUserProducts);

router.post("/user/add_product", addProduct);

router.post("/user/add_to_cart/:id", addToCart);

router.post('/user/edit_product', handleEditProduct)

router.get("/user/cart_products/:id",getCartProducts);

router.post('/user/delete_product/', handleDeleteProduct)

router.get('/user/sold/:id', handleSoldProduct)

router.post('/user/checkout', handleCheckout)

export default router;
