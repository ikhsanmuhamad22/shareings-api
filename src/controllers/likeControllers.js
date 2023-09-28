const likeService = require('../services/likeService');

exports.likePost = async (req, res) => {
  try {
    const postId = parseFloat(req.params.postId);
    const { userId } = req;
    const data = await likeService.likePost({ userId, postId });
    res.status(201)
      .send({
        data,
      });
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan dalam mengolah permintaan Anda',
      error: error.message,
    });
  }
};

exports.getLikeCountPerPost = async (req, res) => {
  try {
    const postId = parseFloat(req.params.postId);
    const data = await likeService.getLikeCountPerPost({ postId });
    res.status(201)
      .send({
        message: 'berhasil mengambil data',
        data,
      });
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan dalam mengolah permintaan Anda',
      error: error.message,
    });
  }
};
