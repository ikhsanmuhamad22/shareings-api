const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.register = async ({ username, password, gender }) => {
  try {
    const user = prisma.user.create({
      data: {
        username,
        password,
        gender,
      },
    });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.verifyUsername = async ({ username }) => {
  const duplicate = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (duplicate) {
    throw new Error('username sudah digunakan');
  }
};

exports.login = async ({ username, password }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
        password,
      },
    });
    if (!user) {
      throw new Error('Pengguna tidak ditemukan');
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
