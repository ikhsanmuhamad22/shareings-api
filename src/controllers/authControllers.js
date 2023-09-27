const authService = require('../services/authService');
const verifyToken = require('../middleware/jwtAuth');

exports.register = async (req, res) => {
  try {
    const { username, password, gender } = req.body;
    await authService.verifyUsername({ username });
    const data = await authService.register({ username, password, gender });
    res.status(201)
      .send({
        message: 'berhasil membuat akun',
        data,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = await authService.login({ username, password });
    const token = verifyToken.createToken(data.id);
    res.status(201)
      .send({
        message: 'berhasil login',
        data,
        token,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
