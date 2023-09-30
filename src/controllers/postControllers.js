const postService = require('../services/postService');

exports.post = async (req, res) => {
  try {
    const { content } = req.body;
    const { userId } = req;
    const post = await postService.posting({ userId, content });
    res.status(201)
      .send({
        message: 'berhasil posting status',
        post,
      });
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan dalam mengolah permintaan Anda',
      error: error.message,
    });
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const post = await postService.getAllPost();
    res.status(200)
      .send({
        message: 'berhasil mendapatkan data',
        post,
      });
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan dalam mengolah permintaan Anda',
      error: error.message,
    });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const id = parseFloat(req.params.id);
    const data = await postService.getPostById({ id });
    res.status(200)
      .send({
        message: 'berhasil mendapatkan data',
        data,
      });
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan dalam mengolah permintaan Anda',
      error: error.message,
    });
  }
};

exports.getPostBylikes = async (req, res) => {
  try {
    const post = await postService.getPostBylikes();
    res.status(200)
      .send({
        message: 'berhasil mendapatkan data',
        post,
      });
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan dalam mengolah permintaan Anda',
      error: error.message,
    });
  }
};

exports.deletePostByid = async (req, res) => {
  try {
    const id = parseFloat(req.params.id);
    const { userId } = req;
    await postService.deletePostByid({ id, userId });
    res.status(201)
      .send({
        message: 'berhasil menghapus postingan',
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
