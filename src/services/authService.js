const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.register = async ({name, email, password, avatar}) => {
  try {
    const user = prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
        avatar: avatar,
      }
    })
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.register = async ({email, password}) => {
  try {
    const user = prisma.user.findUnique({
      where: {
        email: email,
        password: password
      }
    })
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};