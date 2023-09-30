const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.createComment = async ({ userId, postId, comment }) => {
  try {
    const data = await prisma.comments.create({
      data: {
        userId,
        postId,
        comment,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteComment = async ({ id, userId }) => {
  try {
    const post = await prisma.comments.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!post) {
      throw new Error('anda tidak memiliki hak untuk menghapus comentar ini');
    }

    await prisma.comments.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
