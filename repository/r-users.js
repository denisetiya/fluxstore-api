const prisma = require("../utils/prisma.js")

async function findUserByEmail(email) {

  return await prisma.user.findFirst({
    where: {
      email: email
    },
    take: 1
  });

}

async function createUser(data) {

  return await prisma.user.create({
    data
  });
  
}

async function updatePasswordUser(id, password) {

  return await prisma.user.update({
    where: {
      id : id
    },
    data: {
      password : password
    }
  });

}

module.exports = {
  findUserByEmail,
  createUser,
  updatePasswordUser
};
