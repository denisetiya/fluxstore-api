const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../../repository/users.js");

async function loginUser(userInfo) {
  const user = await findUserByEmail(userInfo.email);

  if (!user) {

    throw new Error("Email not registered");

  }

  const isMatch = await bcrypt.compare(userInfo.password, user.password);

  if (!isMatch) {

    throw new Error("Wrong password");

  }
    const token = jwt.sign({
      id: user.id,
      name: user.name
    }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    return { token,user };

}  

module.exports = {
  loginUser
};

