const express = require("express");
const login = express();
const { loginUser } = require("@service/users/s-login");
const response = require("@utils/response");


login.post("/", async (req, res) => {
  
  const userInfo = req.body;

  try {

    const { token, user } = await loginUser(userInfo);
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return response(200, "Login success", res, user);

  } catch (error) {

    return response(400, error.message, res);

  }
});




module.exports = login;
