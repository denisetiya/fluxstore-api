const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByEmail, updatePasswordUser } = require("../../repository/users.js");


async function validateUser(email) {

  const user = await findUserByEmail(email);

  if (!user) {

    throw new Error("Email not registered");

  }

  return user;

}

async function forgetPasswordUser(data, verifyCode, newPassword) {


  const user = await updatePasswordUser(data.id, newPassword);

  if (!user) {

    throw new Error("Failed to update password");

  }

  return user;

}

module.exports = {
  validateUser,
  forgetPasswordUser
}