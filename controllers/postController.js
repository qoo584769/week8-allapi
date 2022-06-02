const appErr = require('../utils/appErr')

const {
  getPostDB,
  getSpecificPostDB,
  getUserPostDB,
  postPostDB,
  addCommentDB,
  addLikeDB,
  removeLikeDB,
} = require('../repository/postRepl')

// 取得所有貼文
const getPost = async (req, res, next) => {
  const timeSort = req.query.timeSort == 'asc' ? 'createdAt' : '-createdAt'
  const q =
    req.query.q !== undefined ? { content: new RegExp(req.query.q) } : {}
  const data = {
    timeSort,
    q,
  }
  const result = await getPostDB(data)

  // 貼文取得成功
  return res.status(200).json({
    result,
    message: '貼文取得成功',
  })
}
// 取得單一貼文
const getSpecificPost = async (req, res, next) => {
  const { postid } = req.params
  const result = await getSpecificPostDB(postid)
  // 貼文取得成功
  return res.status(200).json({
    result,
    message: '單一貼文成功',
  })
}
// 取得使用者所有貼文
const getUserPost = async (req, res, next) => {
  const { userid } = req.params
  const result = await getUserPostDB(userid)
  // 貼文取得成功
  return res.status(200).json({
    result,
    message: '使用者貼文取得成功',
  })
}

// 發佈貼文
const postPost = async (req, res, next) => {
  const { userid, content } = req.body
  const _id = req._id
  // 驗證是否同一帳號
  if (userid !== _id) {
    return next(appErr(400, '帳號驗證錯誤，請重新登入', next))
  }
  if (content === undefined) {
    return next(appErr(400, '貼文內容未填寫', next))
  }
  const data = { userid, content }
  // 新增新貼文
  const result = await postPostDB(data)
  // 新增貼文成功
  return res.status(200).json({
    result,
    message: '貼文發佈成功',
  })
}

// 貼文留言
const commentPost = async (req, res, next) => {
  // 貼文ID
  const postid = req.params.postid
  // 使用者ID
  const _id = req._id
  const { comment } = req.body
  if (!comment) {
    return next(appErr(400, '留言內容需填寫', next))
  }
  const modelData = {
    postid,
    _id,
    comment,
  }
  const result = await addCommentDB(modelData)
  // 留言成功
  return res.status(200).json({
    result,
    message: '留言成功',
  })
}

// 新增按讚
const addLike = async (req, res, next) => {
  // 貼文ID
  const postid = req.params.postid
  // 使用者ID
  const _id = req._id
  const modelData = { postid, _id }
  const result = await addLikeDB(modelData)
  if (!result) {
    return next(appErr(400, '查無此貼文', next))
  }
  // 按讚成功
  return res.status(200).json({
    result,
    message: '按讚成功',
  })
}

// 取消按讚
const removeLike = async (req, res, next) => {
  // 貼文ID
  const postid = req.params.postid
  // 使用者ID
  const _id = req._id
  const modelData = { postid, _id }
  const result = await removeLikeDB(modelData)
  if (!result) {
    return next(appErr(400, '查無此貼文', next))
  }
  // 取消按讚成功
  return res.status(200).json({
    result,
    message: '取消按讚成功',
  })
}
module.exports = {
  getPost,
  getSpecificPost,
  getUserPost,
  postPost,
  commentPost,
  addLike,
  removeLike,
}
