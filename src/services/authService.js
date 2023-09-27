const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

exports.register = async ({ username, password, gender }) => {
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = prisma.users.create({
      data: {
        username,
        password: hashPassword,
        gender,
      },
    });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.verifyUsername = async ({ username }) => {
  const duplicate = await prisma.users.findUnique({
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
    const data = await prisma.users.findUnique({
      where: {
        username,
      },
    });
    if (!data) {
      throw new Error('Pengguna tidak ditemukan');
    }
    const passwordIsValid = bcrypt.compareSync(
      password,
      data.password,
    );
    if (!passwordIsValid) {
      throw new Error('Password anda salah');
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
