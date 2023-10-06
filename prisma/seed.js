const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

// Seeder untuk tabel Users
const users = [
  {
    id: 1, username: 'ikhsan', password: bcrypt.hashSync('ikhsan123', 10), gender: 'Laki-laki',
  },
  {
    id: 2, username: 'samsul', password: bcrypt.hashSync('samsul123', 10), gender: 'Laki-Laki',
  },
  {
    id: 3, username: 'zahra', password: bcrypt.hashSync('zahra123', 10), gender: 'Perempuan',
  },
  {
    id: 4, username: 'andin', password: bcrypt.hashSync('andin123', 10), gender: 'Perempuan',
  },
  {
    id: 5, username: 'galih', password: bcrypt.hashSync('galih123', 10), gender: 'Laki-laki',
  },
  {
    id: 6, username: 'salman', password: bcrypt.hashSync('salman123', 10), gender: 'Laki-Laki',
  },
];

// Seeder untuk tabel Posts
const posts = [
  {
    id: 1, content: 'Hi apa kabar, Perkanalkan nih nama saya ikhsan', to: 'people all', userId: 1,
  },
  {
    id: 2, content: 'Makan apa kalian pagi ini', to: 'people all', userId: 2,
  },
  {
    id: 3, content: 'Kalo aku sih tempe aja udah cukup', to: 'people all', userId: 2,
  },

];

// Seeder untuk tabel Comments
const comments = [
  {
    id: 1, comment: 'wah salam kenal juga ka', userId: 5, postId: 1,
  },
  {
    id: 2, comment: 'keren banget ka hasil karyanya', userId: 2, postId: 1,
  },
  {
    id: 3, comment: 'makan yang ada aj deh hehe', userId: 3, postId: 3,
  },
  {
    id: 4, comment: 'enak nih kayanya', userId: 4, postId: 2,
  },
];

// Seeder untuk tabel Likes
const likes = [
  { userId: 1, postId: 1 },
  { userId: 2, postId: 1 },
  { userId: 3, postId: 1 },
  { userId: 4, postId: 1 },
  { userId: 5, postId: 1 },
  { userId: 6, postId: 1 },
];

function makeUsers() {
  try {
    Promise.all(
      users.map(async (n) => {
        await prisma.users.create({
          data: { username: n.username, password: n.password, gender: n.gender },
        });
      }),
    );
    console.log('[SEED] success to create records');
  } catch (error) {
    console.error('[SEED] Failed to create records', error);
  } finally {
    prisma.$disconnect();
  }
}
function makePosts() {
  try {
    Promise.all(
      posts.map(async (n) => {
        await prisma.posts.create({
          data: { content: n.content, to: n.to, userId: n.userId },
        });
      }),
    );
    console.log('[SEED] success to create records');
  } catch (error) {
    console.error('[SEED] Failed to create records', error);
  } finally {
    prisma.$disconnect();
  }
}
function makeComments() {
  try {
    Promise.all(
      comments.map(async (n) => {
        await prisma.comments.create({
          data: { comment: n.comment, userId: n.userId, postId: n.postId },
        });
      }),
    );
    console.log('[SEED] success to create records');
  } catch (error) {
    console.error('[SEED] Failed to create records', error);
  } finally {
    prisma.$disconnect();
  }
}
function makeLikes() {
  try {
    Promise.all(
      likes.map(async (n) => {
        await prisma.likes.create({
          data: { userId: n.userId, postId: n.postId },
        });
      }),
    );
    console.log('[SEED] success to create records');
  } catch (error) {
    console.error('[SEED] Failed to create records', error);
  } finally {
    prisma.$disconnect();
  }
}

// entah kenapa seednya harus di run 1 per 1 kalo sekaligus datanya jadi broken

// makeUsers();
// makePosts();
// makeComments();
// makeLikes();
