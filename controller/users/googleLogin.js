const express = require("express");
const googleLogin = express();
const {authorizeUrl, oauth2Client, callback} = require("../../services/users/s-googleauth.js");
const response = require("../../utils/response.js");


googleLogin.get("/", (req, res) => {

  try {

    res.redirect(authorizeUrl);
  
  } catch (error) {

    response(400, error.message, res);
  
  }

})


googleLogin.get("/callback", async (req, res) => {

  const { code } = req.query;
  const {tokens} = await oauth2Client.getToken(code);

  try {
    
    const {user, token} = await callback(tokens);

    
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000

    });

    response(200, "Login success", res, user);


  } catch (error) {
    
    return response(400, error.message, res);

  }

})

module.exports = googleLogin