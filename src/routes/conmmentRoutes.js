const express = require('express')
const commetsControllers = require('../controllers/commentsControllers')
const router = express.Router()

router.post('/createComment', 
  commetsControllers.createComment
)

router.post('/deleteComment', 
  commetsControllers.deleteComment
)


module.exports = router