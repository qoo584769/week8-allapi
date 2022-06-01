const { Schema, model } = require('mongoose')

const postSchema = new Schema(
  {
    content: {
      type: String,
      require: [true, '貼文內容必填'],
    },
    image: {
      type: String,
      default: '',
    },
    userid: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// 虛擬引用  不直接寫死在model 沒有populate就不會顯示 可以關聯非 _id 的欄位
postSchema.virtual('comments', {
  ref: 'comment',
  foreignField: 'postid',
  localField: '_id',
})

const postModel = model('post', postSchema)

module.exports = { postModel }
