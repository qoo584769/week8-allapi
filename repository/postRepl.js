const { userModel } = require('../models/userModel')
const { postModel } = require('../models/postModel')
const { commentModel } = require('../models/commentModel')

// 取得貼文
const getPostDB = async (modelData) => {
  const { timeSort, q } = modelData
  const result = await postModel
    .find(q)
    .populate({ path: 'userid' })
    .populate({ path: 'comments', select: 'comment' })
    .sort(timeSort)
  return result
}
// 取得單一貼文
const getSpecificPostDB = async (modelData) => {
  const result = await postModel
    .findOne({ _id: modelData })
    .populate({ path: 'comments' })
  return result
}
// 取得使用者所有貼文
const getUserPostDB = async (modelData) => {
  const result = await postModel
    .find({ userid: modelData })
    .populate({ path: 'comments' })
  return result
}
// 新增貼文
const postPostDB = async (modelData) => {
  const { userid, content } = modelData
  // 新增貼文
  const newPost = await postModel.create({ userid, content })
  // 新增貼文成功會把貼文ID加入發文者的貼文裡面
  const addPostIdtoUser = await userModel.findByIdAndUpdate(
    { _id: newPost.userid },
    { $push: { postid: newPost._id } },
    { new: true }
  )
  console.log('DB資料新增成功')
  return addPostIdtoUser
}

// 新增留言
const addCommentDB = async (modelData) => {
  const { postid, _id, comment } = modelData
  const newComment = await commentModel.create({ postid, userid: _id, comment })
  console.log(newComment)
  return newComment
}

// 新增按讚
const addLikeDB = async (modelData) => {
  const { postid, _id } = modelData
  console.log(_id)
  const result = await postModel.findOneAndUpdate(
    { _id: postid },
    { $addToSet: { likes: _id } },
    { new: true }
  )
  return result
}

// 刪除按讚
const removeLikeDB = async (modelData) => {
  const { postid, _id } = modelData
  const result = await postModel.findOneAndUpdate(
    { _id: postid },
    { $pull: { likes: _id } },
    { new: true }
  )
  return result
}

module.exports = {
  getPostDB,
  getSpecificPostDB,
  getUserPostDB,
  postPostDB,
  addCommentDB,
  addLikeDB,
  removeLikeDB,
}
