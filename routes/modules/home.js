// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const modules = require('../../models/modules')

router.get('/', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})


// 匯出路由模組
module.exports = router