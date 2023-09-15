const authService = require("../services/authService");
const verifyToken = require('../middleware/jwtAuth')


exports.register = async (req, res, ne) => {
  try {
    const {username, password} = req.body
    await authService.verifyUsername({username})
    const user = await authService.register({username, password});
    res.status(201)
    .send({
      message: 'berhasil membuat akun',
      user
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const {username, password} = req.body
    const user = await authService.login({ username, password});
    const token = verifyToken.createToken(user.id)
    res.status(201)
    .send({
      message: 'berhasil login',
      user,
      token
    })  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
