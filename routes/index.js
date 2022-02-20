// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

//載入驗證登入狀態
const { authenticator } = require('../middleware/auth')

//載入路由
const home = require('./modules/home')
const restaurantList = require('./modules/restaurantList')
const crud = require('./modules/crud')

// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/', home)

// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/user', authenticator, restaurantList)

// 將網址結構符合 /restaurants 字串開頭的 request 導向 restaurants 模組 
router.use('/crud', authenticator, crud)



// 匯出路由器
module.exports = router