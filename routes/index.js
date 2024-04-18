const express = require("express");
const router = express();
const cors = require("cors");

const auth = require("../middleware/auth");
const login = require("../controller/users/login");
const register = require("../controller/users/register");
const forgetPassword = require("../controller/users/forgetPassword");
const googleLogin = require("../controller/users/googleLogin");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(
  cors(//{ origin: "http://localhost:3000" }
));

router.use("/", auth);

// users route
router.use("/user/login", login);
router.use("/user/register", register);
router.use("/user/forgetPassword", forgetPassword);
router.use("/auth/google", googleLogin);




module.exports = router