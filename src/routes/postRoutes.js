const express = require('express')
const router = express.Router()
const postControllers = require('../controllers/postControllers')

router.post('/post', 
  postControllers.post
)

router.get('/getAllPost', 
  postControllers.getAllPost
)
router.get('/getPostById/:id', 
  postControllers.getPostById
)
router.get('/getPostBylikes', 
  postControllers.getPostBylikes
)
router.delete('/deletePostById/:id', 
  postControllers.deletePostByid
)


module.exports = router