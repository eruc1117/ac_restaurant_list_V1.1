const express = require('express')
const router = express.Router()
const User = require('../../models/user')
// 引用 passport
const passport = require('passport')

router.get('/', (req, res) => {
  res.render('login')
})
// routes/modules/users.js
router.post('/login', passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/'
}))
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  // 取得註冊表單參數
  const userData = req.body
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
  res.redirect('/')
})

module.exports = router

async function repeatCheck(userData) {
  let result = await User.findOne({ email: userData.email }).lean()
  if (result) {
    console.log('User already exists.')
    return {
      data: result, repeat: true
    }
  } else {
    await User.create({
      name: userData.name,
      email: userData.email,
      password: userData.password
    })
    return {
      data: userData, repeat: false
    }
  }
}