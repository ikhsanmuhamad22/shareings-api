const { jwt } = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader) {
    return res.status(500).send({
        auth: false,
        message: 'Error',
        errors: 'No token provided'
    });
  }
  if (tokenHeader.split(' ')[0] !== 'Bearer') {
    return res.status(500).send({
        auth: false,
        message: 'Error',
        errors: 'Incorrect token format'
    });
  }

  const token = tokenHeader.split(' ')[1];
  if (!token) {
    return res.status(403).send({
        auth: false,
        message: 'Error',
        errors: 'No token provided'
    });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
        return res.status(500).send({
          auth: false,
          message: 'Error',
          errors: err
        });
    }
    req.userId = decoded.id;
    next();
  });
};

exports.createToken = (id) => {
  return jwt.sign({ username }, secretKey, { expiresIn: '1h' });
}