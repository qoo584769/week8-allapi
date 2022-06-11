const express = require('express')
const router = express.Router()

const mailController = require('../controllers/mailController')

const handleErrorAsync = require('../middleware/errorHandler')

// 寄信用
router.post('/', handleErrorAsync(mailController.sendMail))
// 重設密碼
router.post('/forgotPassword', handleErrorAsync(mailController.forgotPassword))


module.exports = router
