const express = require("express");

const { forgetPasswordUser, validateUser} = require("../../services/users/s-forgetPassword.js");
const response = require("../../utils/response.js");
const generateRandomNumbers = require("../../utils/randomInt.js");
const mailer = require("../../utils/mailer.js");

const verificationEmailRouter = express.Router();
const verificationCodeRouter = express.Router();
const forgetPasswordRouter = express.Router();


verificationEmailRouter.post("/", async (req, res) => {
  const {email} = req.body;
  try {
    
    const user = await validateUser(email);

    if (!user) {

      return response(400, "Email not Found", res, null);

    }
    
    const  verifyCode = generateRandomNumbers();

    res.cookie('verifyCode', verifyCode, {
      httpOnly: true,
      secure: true,
      maxAge: 10 * 60 * 1000
    })

    const result = await mailer(user, verifyCode);

    if(result) {
      return response(200, "Email verified", res);  
    }


  } catch (error) {

    return response(400, error.message, res, null);
    
  }
})

verificationCodeRouter.post("/", async (req, res) => {
  
  const {code} = req.body;
  const verifyCode = req.cookies.verifyCode;

  try {

    if (code !== verifyCode) {

      throw new Error("Invalid code");

    }

    return response(200, "Code verified", res);

  } catch (error) {
    
    return response(400, error.message, res, null);

  }

  
})

forgetPasswordRouter.put("/", async (req, res) => {
  
  const {email, newPassword} = req.body;

  try {
    

      const result = await forgetPasswordUser(email, newPassword);

      if (!result) {

        throw new Error("Failed to update password");

      }
  
      return response(200, "Update password success", res, result);

    } catch (error) {
    
    return response(400, error.message, res, null);

  }

})



module.exports = {
  verificationEmailRouter,
  verificationCodeRouter,
  forgetPasswordRouter
}
