const express = require("express");
const forgetPassword = express();
const { forgetPasswordUser, validateUser } = require("../../services/users/forgetPassword");
const response = require("../../utils/response");

forgetPassword.put("/", async (req, res) => {
  
  const { email, verifyCode, newPassword } = req.body;

  try {
    
    const user = await validateUser(email);
    if (user) {

      const result = await forgetPasswordUser(user, verifyCode, newPassword);
  
      return response(200, "Update password success", res, result);

    }

  } catch (error) {
    
    return response(400, error.message, res, null);

  }

})

module.exports = forgetPassword
