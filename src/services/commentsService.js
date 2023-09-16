const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createComment = async ({userId, postId, comment}) => {
  try {
    const data = await prisma.comment.create({
      data: {
        userId,
        postId,
        comment
      }
    })
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteComment = async ({id, userId}) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId
      }
    })
    const comment = await prisma.comment.delete({
      where: {
        id,
        userId: user.id
      }
    })
    if(!comment) {
      throw new Error('maaf anda tidak punya berhak')
    }
  } catch (error) {
    throw new Error(error.message);
  }
};