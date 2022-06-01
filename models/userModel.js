const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, '使用者名稱需填寫'],
    },
    email: {
      type: String,
      required: [true, '信箱需填寫'],
    },
    password: {
      type: String,
      required: [true, '密碼需填寫'],
      select: false,
    },
    shot: {
      type: String,
      default: '',
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      default: 'male',
    },
    postid: [
      {
        type: Schema.Types.ObjectId,
        ref: 'post',
      },
    ],
    follower: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
        createAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    following: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
        createAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  {
    versionKey: false,
  }
)

const userModel = model('user', userSchema)

module.exports = { userModel }
