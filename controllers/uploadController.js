const sizeOf = require('image-size')
const { ImgurClient } = require('imgur')
const appErr = require('../utils/appErr')

const imageUpload = async (req, res, next) => {
  if (!req.files) {
    return next(appErr(400, '尚未上傳圖片', next))
  }

  // 驗證檔案是否符合設定的長寬比 不寫就是任何長寬比都可以
  // const dimensions = sizeOf(req.files[0].buffer)
  // if(dimensions.width !== dimensions.height){
  //     return next(appErr(400,'圖片不符合 1:1 尺寸',next))
  // }

  // 加入imgur的各種憑證
  const client = new ImgurClient({
    clientId: process.env.IMGUR_CLIENT_ID,
    clientSecret: process.env.IMGUR_CLIENT_SECRET,
    refreshToken: process.env.IMGUR_REFRESH_TOKEN,
  })

  // 接收上傳 imgur 的回傳結果
  const response = await client.upload({
    image: req.files[0].buffer.toString('base64'),
    type: 'base64',
    album: process.env.IMGUR_ALBUM_ID,
  })

  res.status(200).json({
    status: 'success',
    imgUrl: response.data.link,
  })
}

module.exports = { imageUpload }
