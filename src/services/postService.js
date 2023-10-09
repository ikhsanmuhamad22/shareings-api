const { PrismaClient } = require('@prisma/client');
const { getLikeCountPerPost } = require('./likeService');
const NotFoundError = require('../exeptions/NotFoundError');
const AuthorizationError = require('../exeptions/AuthorizationError');

const prisma = new PrismaClient();

exports.posting = async ({ userId, content, to }) => {
  try {
    const post = await prisma.posts.create({
      data: {
        userId,
        content,
        to,
      },
    });
    return post;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getAllPost = async () => {
  try {
    const post = await prisma.posts.findMany({
      include: {
        users: {
          select: {
            username: true,
          },
        },
      },
    });
    return post;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getPostById = async ({ id }) => {
  try {
    const post = await prisma.posts.findFirst({
      where: { id },
      include: {
        users: {
          select: {
            username: true,
          },
        },
        comments: { select: { comment: true } },
      },
    });
    return post;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getPostBylikes = async () => {
  try {
    const posts = await prisma.posts.findMany({
      include: {
        users: {
          select: {
            username: true,
          },
        },
      },
    });
    const postsWithLikeCount = await Promise.all(
      posts.map(async (post) => {
        const likeCount = await getLikeCountPerPost({ postId: post.id });
        return {
          ...post,
          likeCount,
        };
      }),
    );
    postsWithLikeCount.sort((a, b) => b.likeCount - a.likeCount);
    return postsWithLikeCount;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deletePostByid = async ({ id, userId }) => {
  try {
    const post = await prisma.posts.findFirst({
      where: {
        id,
        userId,
      },
    });
    if (!post) {
      throw new NotFoundError('Post tidak ditemukan atau Anda tidak memiliki hak untuk menghapus postingan ini ');
    }
    await prisma.posts.delete({
      where: {
        id,
      },
    });
    if (!post) {
      throw new AuthorizationError('maaf anda tidak punya berhak');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
