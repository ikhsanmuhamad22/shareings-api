const commentsService = require('../services/commentsService')

exports.createComment = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId)
    const {comment} = req.body
    const userId = req.userId
    const data = await commentsService.createComment({userId, postId, comment});
    res.status(201)
    .send({
      message: 'berhasil membuat komentar',
      data
    })
  } catch (error) {
    console.error(error.message); 
    res.status(500).json({ message: 'Terjadi kesalahan dalam mengolah permintaan Anda' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const userId = req.userId
    await commentsService.deleteComment({id, userId});
    res.status(201)
    .send({
      message: 'berhasil menghapush komentar',
    })
  } catch (error) {
    console.error(error.message); 
    res.status(500).json({ message: 'Terjadi kesalahan dalam mengolah permintaan Anda' });
  }
};