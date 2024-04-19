const express = require("express");
const router = express();
const cors = require("cors");

const auth = require("../middleware/auth");
const login = require("../controller/users/login");
const register = require("../controller/users/register");
const {verificationCodeRouter, verificationEmailRouter,forgetPasswordRouter}= require("../controller/users/forgetPassword");
const googleLogin = require("../controller/users/googleLogin");
const addProductRoute = require("../controller/products/addProduct");
const showProductRoute = require("../controller/products/showProduct");
const {deleteProductRoute, deleteProductDetailRoute} = require("../controller/products/deleteProduct");
const updateProductRoute = require("../controller/products/updateProduct");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(
  cors(//{ origin: "http://localhost:3000" }
));

router.use("/", auth);

// users route
router.use("/user/login", login);
router.use("/user/register", register);
router.use("/auth/google", googleLogin);

// forget password flow
router.use("/user/verifyEmail", verificationEmailRouter);
router.use("/user/verifyCode", verificationCodeRouter);
router.use("/user/forgetPassword", forgetPasswordRouter);

// product route
router.use("/product/add", addProductRoute);
router.use("/product/show", showProductRoute);
router.use("/product/delete", deleteProductRoute);
router.use("/product/deleteDetail", deleteProductDetailRoute);
router.use("/product/update", updateProductRoute);


module.exports = router
