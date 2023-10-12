const express = require('express');

const router = express.Router();
const likeController = require('../controllers/likeControllers');
const jwtAuth = require('../middleware/jwtAuth');

router.post(
  '/likePost/:postId',
  jwtAuth.verifyToken,
  likeController.likePost,
);

router.get(
  '/getLikePost/:postId',
  likeController.getLikeCountPerPost,
);

router.get(
  '/getLikePostById/:postId',
  jwtAuth.authenticateToken,
  likeController.getLikeByUserId,
);

module.exports = router;
