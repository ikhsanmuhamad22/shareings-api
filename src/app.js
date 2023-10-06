const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const likeRoutes = require('./routes/likeRoutes');
const commentsRoutes = require('./routes/conmmentRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentsRoutes);
app.use('/like', likeRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
