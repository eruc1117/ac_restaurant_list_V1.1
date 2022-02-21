const express = require('express')
const router = express.Router()
const User = require('../../models/user')
// 引用 passport
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/', (req, res) => {
  res.render('login')
})
// routes/modules/users.js
router.post('/login', passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/',
  failureMessage: true
}))


router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  // 取得註冊表單參數
  const userData = req.body
  const errors = []
  if (!userData.email || !userData.password || !userData.confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (userData.password !== userData.confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      info: userData
    })
  }
  // 檢查使用者是否已經註冊
  try {
    repeatCheck(userData)
      .then(data => {
        if (data.repeat) {
          res.render('register', {
            info: data.data
          })
        } else {
          res.redirect('/')
        }
      })
  } catch (err) {
    console.log(err)
  }

})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/')
})

module.exports = router

async function repeatCheck(userData) {
  const bcrypt = require('bcryptjs')
  let result = await User.findOne({ email: userData.email }).lean()
  if (result) {
    console.log('User already exists.')
    return {
      data: result, repeat: true
    }
  } else {
    bcrypt
      .genSalt(10) // 產生「鹽」，並設定複雜度係數為 10
      .then(salt => bcrypt.hash(userData.password, salt)) // 為使用者密碼「加鹽」，產生雜湊值
      .then(hash => User.create({
        name: userData.name,
        email: userData.email,
        password: hash// 用雜湊值取代原本的使用者密碼
      }))
    return {
      data: userData, repeat: false
    }
  }
}