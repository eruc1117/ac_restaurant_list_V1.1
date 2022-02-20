// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 restaurantModel
const restaurantModel = require('../../models/restaurantModel')

// 設定登入後首頁
router.get('/', (req, res) => {
  const userId = req.user._id
  restaurantModel.find({ userId })
    .lean()
    .sort({ ['id']: 1 })
    .then(restaurantList => res.render('index', { restaurantList }))
    .catch(error => console.error(error))
})
//餐廳排列方式
router.get('/sort/:name', (req, res) => {
  const userId = req.user._id
  const [property, sortBy] = req.params.name.split('_')
  restaurantModel.find({ userId })
    .lean()
    .sort({ [property]: sortBy })
    .then(restaurantList => res.render('index', { restaurantList }))
    .catch(error => console.error(error))
})
//搜索餐廳
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  const reg = new RegExp(keyword, 'i')
  const userId = req.user._id
  restaurantModel.find({ $or: [{ name: reg }, { name_en: reg }, { category: reg }], userId })
    .lean()
    .then(restaurantList => restaurantList.length === 0
      ? res.render('nonsearchResult')
      : res.render('index', { restaurantList }))
    .catch(error => console.log('error:' + error))
})



// 匯出路由模組
module.exports = router