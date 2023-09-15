const authService = require("../services/authService");


exports.register = async (req, res) => {
  try {
    const {name , email, password, avatar} = req.body
    const user = await authService.register({name, email, password, avatar});
    console.log(user)
    res.status(201)
    .send({
      message: 'berhasil membuat akun',
      user
    })
  } catch (error) {
    console.error(error.message); 
    res.status(500).json({ message: 'Terjadi kesalahan dalam mengolah permintaan Anda' });
  }
};

exports.login = async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await authService.register({ email, password,});
    res.status(201)
    .send({
      message: 'berhasil login',
      user
    })  } catch (error) {
    console.error(error.message); 
    res.status(500).json({ message: 'Terjadi kesalahan dalam mengolah permintaan Anda' });
  }
};
