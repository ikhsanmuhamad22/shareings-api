const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.likePost = async ({ postId, userId }) => {
  const existingLike = await prisma.likes.findFirst({
    where: {
      postId,
      userId,
    },
  });

  if (existingLike) {
    await prisma.likes.delete({
      where: {
        id: existingLike.id,
      },
    });
    return { message: 'Post unliked' };
  }
  await prisma.likes.create({
    data: {
      postId,
      userId,
    },
  });
  return { message: 'Post liked' };
};

exports.getLikeCountPerPost = async ({ postId }) => {
  const likeCount = await prisma.likes.count({
    where: {
      postId,
    },
  });
  return likeCount;
};

exports.getLikeByUserId = async ({ postId, userId }) => {
  const data = await prisma.likes.findFirst({
    where: {
      postId,
      userId,
    },
  });
  if (data) {
    return true;
  }
  return false;
};
