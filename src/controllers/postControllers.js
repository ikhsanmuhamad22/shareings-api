const postService = require('../services/postService')

exports.post = async (req, res) => {
  try {
    const {content} = req.body
    const userId = req.userId
    const post = await postService.posting({userId, content});
    res.status(201)
    .send({
      message: 'berhasil posting status',
      post
    })
  } catch (error) {
    console.error(error.message); 
    res.status(500).json({ message: 'Terjadi kesalahan dalam mengolah permintaan Anda' });
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const post = await postService.getAllPost();
    res.status(200)
    .send({
      message: 'berhasil mendapatkan data',
      post
    })
  } catch (error) {
    console.error(error.message); 
    res.status(500).json({ message: 'Terjadi kesalahan dalam mengolah permintaan Anda' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const post = await postService.getPostById({id});
    res.status(200)
    .send({
      message: 'berhasil mendapatkan data',
      post
    })
  } catch (error) {
    console.error(error.message); 
    res.status(500).json({ message: 'Terjadi kesalahan dalam mengolah permintaan Anda' });
  }
};

exports.getPostBylikes = async (req, res) => {
  try {
    const post = await postService.getPostBylikes();
    res.status(200)
    .send({
      message: 'berhasil mendapatkan data',
      post
    })
  } catch (error) {
    console.error(error.message); 
    res.status(500).json({ message: 'Terjadi kesalahan dalam mengolah permintaan Anda' });
  }
};

exports.deletePostByid = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const userId = req.userId
    await postService.deletePostByid({id, userId});
    res.status(201)
    .send({
      message: 'berhasil menghapus postingan',
    })
  } catch (error) {
    console.error(error.message); 
    res.status(500).json({ message: error.message });
  }
};