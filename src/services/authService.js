const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const InvariantError = require('../exeptions/InvariantError');
const AuthenticationError = require('../exeptions/AuthenticationError');

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
    throw new InvariantError('username sudah digunakan');
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
      throw new AuthenticationError('Pengguna tidak ditemukan');
    }
    const passwordIsValid = bcrypt.compareSync(
      password,
      data.password,
    );
    if (!passwordIsValid) {
      throw new InvariantError('Password anda salah');
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.user = async ({ id }) => {
  try {
    const data = await prisma.users.findUnique({
      where: {
        id,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
