const express = require("express");
const register = express();
const { registerUser } = require("../../services/users/s-register.js");
const response = require("../../utils/response.js");

register.post("/", async (req, res) => {

  const userInfo = req.body;

  try {

    const { user, token } = await registerUser(userInfo);

    response(200, "Register success", res, user, token);
    
  } catch (error) {

    response(400, error.message, res, null);

  }
});

module.exports = register;
