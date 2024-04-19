const bcrypt = require("bcrypt");
const { findUserByEmail, updatePasswordUser } = require("../../repository/r-users.js");


async function validateUser(email) {

  const user = await findUserByEmail(email);

  if (!user) {

    throw new Error("Email not registered");

  }

  return user;

}



async function forgetPasswordUser(email,newPassword) {


  const data = await validateUser(email);

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const user = await updatePasswordUser(data.id, hashedPassword);

  if (!user) {

    throw new Error("Failed to update password");

  }

  return user;

}

module.exports = {
  validateUser,
  forgetPasswordUser
}