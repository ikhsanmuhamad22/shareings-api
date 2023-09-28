const commentService = require('../services/commentService');

exports.createComment = async (req, res) => {
  try {
    const postId = parseFloat(req.params.postId);
    const { comment } = req.body;
    const { userId } = req;
    const data = await commentService.createComment({ userId, postId, comment });
    res.status(201)
      .send({
        message: 'berhasil membuat komentar',
        data,
      });
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan dalam mengolah permintaan Anda',
      error: error.message,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const id = parseFloat(req.params.id);
    const { userId } = req;
    await commentService.deleteComment({ id, userId });
    res.status(201)
      .send({
        message: 'berhasil menghapush komentar',
      });
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan dalam mengolah permintaan Anda',
      error: error.message,
    });
  }
};
