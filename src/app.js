import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = process.env.PORT  || 3000;

app.get('/', async (req, res) => {
  try {
    res.send('ini cuma testing');
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

