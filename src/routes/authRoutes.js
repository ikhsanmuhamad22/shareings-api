const express = require('express');
const authControllers = require('../controllers/authControllers');
const { authenticateToken } = require('../middleware/jwtAuth');

const router = express.Router();

router.post(
  '/register',
  authControllers.register,
);

router.post(
  '/login',
  authControllers.login,
);

router.get(
  '/user',
  authenticateToken,
  authControllers.user,
);

module.exports = router;
