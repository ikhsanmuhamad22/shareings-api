const express = require('express');

const router = express.Router();
const postControllers = require('../controllers/postControllers');
const jwtAuth = require('../middleware/jwtAuth');

router.post(
  '/createPost',
  jwtAuth.verifyToken,
  postControllers.post,
);

router.get(
  '/getAllPost',
  postControllers.getAllPost,
);
router.get(
  '/getPostById/:id',
  postControllers.getPostById,
);
router.get(
  '/getPostBylikes',
  postControllers.getPostBylikes,
);
router.delete(
  '/deletePostById/:id',
  jwtAuth.verifyToken,
  postControllers.deletePostByid,
);

module.exports = router;
