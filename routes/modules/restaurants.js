// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 restaurantModel
const restaurantModel = require('../../models/restaurantModel')

//顯示餐廳詳細資料
router.get('/restaurants/detail/:id', (req, res) => {
  const id = req.params.id
  return restaurantModel.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})

//修改頁面
router.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return restaurantModel.findById(id)
    .lean()
    .then(restaurant => res.render('editrestaurant', { restaurant }))
    .catch(error => console.error(error))
})

router.put('/restaurants/:id', (req, res) => {
  const restaurant = req.params.id
  const body = (req.body)
  let newBody = modules.bodyDataEdit(body)
  restaurantModel.findByIdAndUpdate(restaurant, newBody)
    .then(() => res.redirect(`/restaurants/detail/${restaurant}`))
    .catch(error => console.log(error))
})

//刪除功能
router.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return restaurantModel.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//搜索功能
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

