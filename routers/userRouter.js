const express = require('express')
const router = express.Router()
// 匯入controller
const userController = require('../controllers/userController')
const handleErrorAsync = require('../middleware/errorHandler')
// 驗證middleware
const isAuth = require('../middleware/isAuth')

// ----------會員個人資料----------
// 註冊
router.post('/sign_up', handleErrorAsync(userController.signup))
// 登入
router.post('/sign_in', handleErrorAsync(userController.signin))
// 變更密碼
router.post(
  '/updatePassword',
  handleErrorAsync(isAuth),
  handleErrorAsync(userController.updatePassword)
)
// 取得會員資料
router.get(
  '/profile',
  handleErrorAsync(isAuth),
  handleErrorAsync(userController.getProfile)
)
// 更新會員資料
router.patch(
  '/profile',
  handleErrorAsync(isAuth),
  handleErrorAsync(userController.editProfile)
)

// ----------會員頁面資料----------
// 追隨
router.post(
  '/:userid/follow',
  handleErrorAsync(isAuth),
  handleErrorAsync(userController.follow)
)
// 取消追隨
router.delete(
  '/:userid/unfollow',
  handleErrorAsync(isAuth),
  handleErrorAsync(userController.unFollow)
)
// 取得追隨名單
router.get(
  '/following',
  handleErrorAsync(isAuth),
  handleErrorAsync(userController.following)
)
// 取得按讚名單
router.get(
  '/getLikeList',
  handleErrorAsync(isAuth),
  handleErrorAsync(userController.getLikeList)
)

module.exports = router
