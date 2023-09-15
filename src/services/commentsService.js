const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.comments = async ({userId, comment}) => {
  try {
    const data = await prisma.comment.create({
      data: {
        userId,
        comment
      }
    })
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.comments = async ({id}) => {
  try {
    await prisma.comment.delete({
      where: {
        id
      }
    })
  } catch (error) {
    throw new Error(error.message);
  }
};