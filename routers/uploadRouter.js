const express = require('express')
const router = express.Router()

const uploadController = require('../controllers/uploadController')
// 驗證middleware
const isAuth = require('../middleware/isAuth')
const { imageCheck } = require('../middleware/uploadMiddleware')

const handleErrorAsync = require('../middleware/errorHandler')

// 圖片上傳
router.post(
  '/',
  handleErrorAsync(isAuth),
  (imageCheck),
  handleErrorAsync(uploadController.imageUpload)
)

module.exports = router
