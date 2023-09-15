const commentsService = require('../services/commentsService')

exports.createComment = async (req, res) => {
  try {
    const {userId, comment} = req.body
    const data = await commentsService.comments({userId, comment});
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
    await commentsService.comments({id});
    res.status(201)
    .send({
      message: 'berhasil menghapush komentar',
    })
  } catch (error) {
    console.error(error.message); 
    res.status(500).json({ message: 'Terjadi kesalahan dalam mengolah permintaan Anda' });
  }
};