// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 準備引入路由模組

// 引入 home 模組程式碼
const home = require('./modules/home')
// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/', home)

const restaurants = require('./modules/restaurants')
// 將網址結構符合 /restaurants 字串開頭的 request 導向 restaurants 模組 
router.use('/restaurants', restaurants)

const search = require('./modules/search')
// 將網址結構符合 /search 字串開頭導向 search模組 
router.use('/restaurants', search)


// 匯出路由器
module.exports = router