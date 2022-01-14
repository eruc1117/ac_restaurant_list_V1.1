// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 restaurantModel
const restaurantModel = require('../../models/restaurantModel')
// 定義首頁路由
router.get('/', (req, res) => {
  restaurantModel.find()
    .lean()
    .sort({ id: 1 })
    .then(restaurantList => res.render('index', { restaurantList }))
    .catch(error => console.error(error))
})
// 匯出路由模組
module.exports = router
