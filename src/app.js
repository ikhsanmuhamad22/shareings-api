const express = require('express');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/auth', authRoutes)
app.use('/post', postRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

