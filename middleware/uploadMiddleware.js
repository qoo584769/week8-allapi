// 內建路徑模組
const path = require('path')
// 上傳檔案驗證模組
const multer = require('multer')

const appErr = require('../utils/appErr')

// 驗證檔案模式及大小
const imageCheck = multer({
  // 限制上傳檔案的最大大小 沒寫就是不限制大小
  limits: {
    // 最大可以上傳 2MB 的圖片
    fileSize: 2 * 1024 * 1024,
  },
  // 限制可以上傳的檔案格式 沒寫就是不限制格式
  fileFilter(req, file, cb) {
    fileExtension = path.extname(file.originalname).toLowerCase()
    if (
      fileExtension !== '.jpg' &&
      fileExtension !== '.jepg' &&
      fileExtension !== '.png'
    ) {
      // cb 類似 next
      cb(new Error('檔案格式錯誤，僅限上傳 jpg、jpeg 與 png 格式。'))
    }
    cb(null, true)
  },
}).any()

module.exports = { imageCheck }
