const crypto = require('crypto')
const nodemailer = require('nodemailer')

const { forgotPasswordDB } = require('../repository/userRepl')

const appErr = require('../utils/appErr')

// 測試寄信用
const sendMail = async (req, res, next) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASS_KEY,
    },
  })

  const result = await transporter.sendMail({
    from: 'uh584697213@gmail.com',
    to: 'uh584697213@gmail.com',
    subject: '測試信件',
    text:
      'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
      //   + `https://codepen.io/fxq14103/pen/QWQZJaO/${token}\n\n`
      `https://codepen.io/fxq14103/pen/QWQZJaO/515152\n\n` +
      'If you did not request this, please ignore this email and your password will remain unchanged.\n',
    //   html: '',
  })
  console.log(result)
  res.status(200).json(result)
}

// 忘記密碼發信
const forgotPassword = async (req, res, next) => {
  if (req.body.email === '' || req.body.email === undefined) {
    return res.status(400).send('信箱必填')
  }
  const token = crypto.randomBytes(20).toString('hex')

  const resetToken = {
    email: req.body.email,
    resetPasswordToken: token,
    resetPasswordExpires: Date.now() + 3600000,
  }

  const emailCheck = await forgotPasswordDB(resetToken)

  // 驗證信箱是不是有註冊 沒驗證直接寄也可以 就是寄給不存在的信箱
  if (!emailCheck) {
    return next(appErr(400, '信箱不存在', next))
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASS_KEY,
    },
  })

  const result = await transporter.sendMail({
    from: 'demo@gmail.com',
    to: emailCheck.email,
    subject: '密碼重置信件',
    text:
      'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
      `https://codepen.io/fxq14103/pen/QWQZJaO?editors=1111&token=${token}\n\n` +
      'If you did not request this, please ignore this email and your password will remain unchanged.\n',
    //   html: '',
  })

  res.status(200).json('密碼重置信已發送')
}
module.exports = { sendMail, forgotPassword }
