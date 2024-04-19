const express = require("express");
const auth = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const response = require("../utils/response.js");

auth.use(cookieParser());

auth.use((req, res, next) => {
  if (req.path === "/user/login" || req.path === "/auth/google" || req.path === "/api-login" || req.path === "/user/forgetPassword" || req.path === "/auth/google/callback" || req.path === "/user/register") {
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
