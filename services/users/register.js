const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser } = require("../../repository/users.js");


async function registerUser(userInfo) {

  if (userInfo.password !== userInfo.confirmPassword) {

    throw new Error("Register failed, confirm password not match");

  }

  const hashedPassword = await bcrypt.hash(userInfo.password, 10);

  const user = await createUser({
    name: userInfo.name,
    password: hashedPassword,
    email: userInfo.email,
    address: userInfo.address
  });

  if (!user) {

    throw new Error("Failed to register user");

  }

  const token = jwt.sign({
    id: user.id,
    username: user.username,
    email: user.email,
    address: user.address,
  }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });

  return { user,token };
}

module.exports = {
  registerUser
};
