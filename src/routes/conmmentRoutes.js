const express = require('express');
const commetsControllers = require('../controllers/commentControllers');
const jwtAuth = require('../middleware/jwtAuth');

const router = express.Router();

router.post(
  '/createComment/:postId',
  jwtAuth.verifyToken,
  commetsControllers.createComment,
);

router.delete(
  '/deleteCommentById/:id',
  jwtAuth.verifyToken,
  commetsControllers.deleteComment,
);

module.exports = router;
