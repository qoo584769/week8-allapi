const { userModel } = require('../models/userModel')

// ---------------會員個人資料---------------
// 註冊  modelData 為一個物件
const signupDB = async (modelData) => {
  const { email } = modelData

  // 驗證信箱是否註冊過
  const emailRes = await userModel.findOne({ email }, 'email')
  if (emailRes) {
    return { status: false, message: '信箱已被註冊' }
  }

  // 信箱未註冊過 新增到資料庫
  const createRes = await userModel.create(modelData)
  const data = {
    status: 'success',
    _id: createRes._id,
    name: createRes.name,
    email: createRes.email,
  }
  return data
}
// 登入 modelData 只傳入email
const signinDB = async (modelData) => {
  const email = modelData
  const result = await userModel.findOne({ email }).select('+password')
  return result
}
// 重設密碼  modelData 為一個物件
const updatePasswordDB = async (modelData) => {
  const { _id, password } = modelData
  const result = await userModel.findByIdAndUpdate(
    _id,
    {
      password,
    },
    {
      new: true,
      runValidators: true,
    }
  )
  return result
}
// 取得會員資料  modelData 只傳入 id
const getProfileDB = async (modelData) => {
  const _id = modelData
  const result = await userModel.findById(_id)
  return result
}
// 更新會員資料  modelData 為一個物件
const updateProfileDB = async (modelData) => {
  const { _id, name, gender, shot } = modelData
  const result = await userModel.findByIdAndUpdate(
    _id,
    { name, gender, shot },
    { new: true, runValidators: true }
  )
  return result
}

// ---------------會員頁面資料---------------
// 追隨  modelData 為一個物件
const followDB = async (modelData) => {
  const { followingId, followerId } = modelData
  // 追隨的使用者
  const followingUpdate = await userModel.findOneAndUpdate(
    {
      _id: followerId,
      'following.user': { $ne: followingId.id },
    },
    {
      $addToSet: { following: { user: followingId } },
    },
    {
      new: true,
    }
  )
  // 被追隨的使用者
  const follower = await userModel.findOneAndUpdate(
    {
      _id: followingId,
      'follower.user': { $ne: followerId.id },
    },
    {
      $addToSet: { following: { user: followerId } },
    },
    {
      new: true,
    }
  )
  return 'success'
}
// 追隨  modelData 為一個物件
const unFollowDB = async (modelData) => {
  const { followingId, followerId } = modelData
  // 追隨的使用者
  const followingUpdate = await userModel.findOneAndUpdate(
    {
      _id: followerId,
    },
    {
      $pull: { following: { user: followingId } },
    },
    {
      new: true,
    }
  )
  // 被追隨的使用者
  const follower = await userModel.findOneAndUpdate(
    {
      _id: followingId,
    },
    {
      $pull: { following: { user: followerId } },
    },
    {
      new: true,
    }
  )
  return 'success'
}

module.exports = {
  // 會員個人資料
  signupDB,
  signinDB,
  updatePasswordDB,
  getProfileDB,
  updateProfileDB,
  // 會員頁面資料
  followDB,
  unFollowDB
}
