// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 準備引入路由模組

const { authenticator } = require('../middleware/auth')

// 引入 home 模組程式碼
const home = require('./modules/home')


// 引入 restaurantList 模組程式碼
const restaurantList = require('./modules/restaurantList')
// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/user', authenticator, restaurantList)

const crud = require('./modules/crud')
// 將網址結構符合 /restaurants 字串開頭的 request 導向 restaurants 模組 
router.use('/crud', authenticator, crud)

// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/', home)

// 匯出路由器
module.exports = router