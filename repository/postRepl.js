const { userModel } = require('../models/userModel')
const { postModel } = require('../models/postModel')

// 取得貼文
const getPostDB = async (modelData) => {
  const { timeSort, id } = modelData
  const result = await postModel
    .find({_id:id})
    .populate({ path: 'userid' })
    .sort(timeSort)
  return result
}
// 新增貼文
const postPostDB = async (modelData) => {
  const { _id, content } = modelData
  // 新增貼文
  const newPost = await postModel.create({ userid: _id, content })
  // 新增貼文成功會把貼文ID加入發文者的貼文裡面
  const addPostIdtoUser = await userModel.findByIdAndUpdate(
    { _id: newPost.userid },
    { $push: { postid: newPost._id } },
    { new: true }
  )
  console.log('DB資料新增成功')
  return addPostIdtoUser
}
// 新增按讚
const addLikeDB = async (modelData) => {
  const { postid, _id } = modelData
  console.log(_id);
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

module.exports = { getPostDB, postPostDB, addLikeDB, removeLikeDB }
