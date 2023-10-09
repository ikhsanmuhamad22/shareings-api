const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader) {
    return res.status(500).send({
      auth: false,
      message: 'Error',
      errors: 'No token provided',
    });
  }
  if (tokenHeader.split(' ')[0] !== 'Bearer') {
    return res.status(500).send({
      auth: false,
      message: 'Error',
      errors: 'Incorrect token format',
    });
  }

  const token = tokenHeader.split(' ')[1];
  if (!token) {
    return res.status(403).send({
      auth: false,
      message: 'Error',
      errors: 'No token provided',
    });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: 'Error',
        errors: err.message,
      });
    }
    req.userId = decoded.id;
    next();
  });
};

exports.createToken = (id) => jwt.sign({ id }, process.env.SECRET, { expiresIn: '24h' });

exports.authenticateToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify(bearerToken, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.userId = decoded.id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
