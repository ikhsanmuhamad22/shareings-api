const { PrismaClient } = require('@prisma/client');
const { getLikeCountPerPost } = require('./likeService');

const prisma = new PrismaClient();

exports.posting = async ({ userId, content }) => {
  try {
    const post = await prisma.posts.create({
      data: {
        userId,
        content,
      },
    });
    return post;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getAllPost = async () => {
  try {
    const post = await prisma.posts.findMany();
    return post;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getPostById = async ({ id }) => {
  try {
    const post = await prisma.posts.findFirst({
      where: { id },
      include: { comments: { select: { comment: true } } },
    });
    return post;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getPostBylikes = async () => {
  try {
    const posts = await prisma.posts.findMany();
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
    throw new Error(error);
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
      throw new Error('Post tidak ditemukan atau Anda tidak memiliki hak untuk menghapus postingan ini ');
    }
    await prisma.posts.delete({
      where: {
        id,
      },
    });
    if (!post) {
      throw new Error('maaf anda tidak punya berhak');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
