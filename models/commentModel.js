const { Schema, model } = require('mongoose')

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, '留言必填'],
    },
    userid: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, '留言必須有使用者ID'],
    },
    postid: {
      type: Schema.Types.ObjectId,
      ref: 'post',
      required: [true, '留言必須有貼文ID'],
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
)
// 預處理引用 符合正規就會執行
commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'userid',
    select: 'name id createAt',
  })
  next()
})

const commentModel = model('comment', commentSchema)

module.exports = { commentModel }
