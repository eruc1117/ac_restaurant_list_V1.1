// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 restaurantModel
const restaurantModel = require('../../models/restaurantModel')
const modules = require('../../models/modules')
// 定義首頁路由
router.get('/', (req, res) => {
  restaurantModel.find()
    .lean()
    .sort({ id: 1 })
    .then(restaurantList => res.render('index', { restaurantList }))
    .catch(error => console.error(error))
})
router.get('/atoz', (req, res) => {
  restaurantModel.find()
    .lean()
    .sort({ name: 1 })
    .then(restaurantList => res.render('index', { restaurantList }))
    .catch(error => console.error(error))
})
router.get('/ztoa', (req, res) => {
  restaurantModel.find()
    .lean()
    .sort({ name: -1 })
    .then(restaurantList => res.render('index', { restaurantList }))
    .catch(error => console.error(error))
})
router.get('/category', (req, res) => {
  restaurantModel.find()
    .lean()
    .sort({ category: 1 })
    .then(restaurantList => res.render('index', { restaurantList }))
    .catch(error => console.error(error))
})
router.get('/area', (req, res) => {
  restaurantModel.find()
    .lean()
    .sort({ location: 1 })
    .then(restaurantList => res.render('index', { restaurantList }))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  const keyword = modules.removeBlank(req.query.keyword).toLowerCase()
  const reg = new RegExp(keyword, 'i')

  restaurantModel.find({ $or: [{ name: reg }, { name_en: reg }, { category: reg }] })
    .lean()
    .then(restaurantList => restaurantList.length === 0
      ? res.render('nonsearchResult')
      : res.render('index', { restaurantList }))
    .catch(error => console.log('error:' + error))
})
// 匯出路由模組
module.exports = router
