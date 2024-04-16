const express = require("express");
const auth = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const response = require("../utils/response");

auth.use(cookieParser());

auth.use((req, res, next) => {
  if (req.path === "/user/login" || req.path === "/user/register" || req.path === "/api-docs" || req.path === "/user/forgetPassword") {
    return next();
  }
  const token = req.cookies ? req.cookies.token : null;

  if (!token) {
    return response(401, "Unauthorized", res);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return response(401, "Unauthorized", res);
  }
});


module.exports = auth;
