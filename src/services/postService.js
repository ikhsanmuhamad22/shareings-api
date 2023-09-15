const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.posting = async ({userId, content}) => {
  try {
    const post = await prisma.post.create({
      data: {
        userId,
        content
      }
    })
    return post;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getAllPost = async () => {
  try {
    const post = await prisma.post.findMany()
    return post;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getPostById = async ({id}) => {
  try {
    const post = await prisma.post.findFirst({
      where: {
        id
      }
    })
    return post;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getPostBylikes = async () => {
  try {
    const post = await prisma.post.findMany({
      orderBy: {
        likes: 'desc'
      }
    })
    return post;
  } catch (error) {
    throw new Error(error);
  }
};

exports.deletePostByid = async ({id}) => {
  try {
    const post = await prisma.post.delete({
      where: {
        id
      }
    })
    return post;
  } catch (error) {
    throw new Error(error.message);
  }
};