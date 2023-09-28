const express = require('express');

const router = express.Router();
const likeController = require('../controllers/likeControllers');
const jwtAuth = require('../middleware/jwtAuth');

router.post(
  '/like',
  jwtAuth.verifyToken,
  likeController.like,
);

router.get(
  '/like',
  likeController.getLikeCountPerPost,
);

module.exports = router;
