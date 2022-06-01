const express = require('express')
const router = express.Router()

const postController = require('../controllers/postController')
// 驗證middleware
const isAuth = require('../middleware/isAuth')

const handleErrorAsync = require('../middleware/errorHandler')

// 取得所有動態
router.get(
  '/',
  handleErrorAsync(isAuth),
  handleErrorAsync(postController.getPost)
)
// 張貼動態
router.post(
  '/',
  handleErrorAsync(isAuth),
  handleErrorAsync(postController.postPost)
)
// 貼文留言
router.post(
  '/:postid/comment',
  handleErrorAsync(isAuth),
  handleErrorAsync(postController.commentPost)
)
// 新增按讚
router.post(
  '/:postid/like',
  handleErrorAsync(isAuth),
  handleErrorAsync(postController.addLike)
)
// 取消按讚
router.delete(
  '/:postid/like',
  handleErrorAsync(isAuth),
  handleErrorAsync(postController.removeLike)
)

module.exports = router
