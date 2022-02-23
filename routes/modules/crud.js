// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 restaurantModel
const restaurantModel = require('../../models/restaurantModel')
const modules = require('../../models/modules')

//新增餐廳
router.get('/create', (req, res) => {
  const userId = req.user._id
  restaurantModel.find({ userId })
    .lean()
    .sort({ id: -1 })
    .then(id => res.render('createRestaurant', {
      id: id.length !== 0 ?
        Number(id[0].id) + 1 :
        1
    }))
    .catch(error => console.log(error))
})

router.put('/create', (req, res) => {
  const body = req.body
  const userId = req.user._id
  let newBody = modules.createNew(body)
  newBody.userId = userId
  restaurantModel.create(newBody)
  res.redirect('/user')
})

//顯示餐廳詳細資料
router.get('/detail/:id', (req, res) => {
  const id = req.params.id
  const userId = req.user._id
  return restaurantModel.findOne({ id })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})

//修改頁面
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  restaurantModel.findOne({ id, userId })
    .lean()
    .then(restaurant => res.render('editrestaurant', { restaurant }))
    .catch(error => console.error(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  const body = (req.body)
  let newBody = modules.bodyDataEdit(body)
  return restaurantModel.findOneAndUpdate({ id, userId }, newBody)
    .then(() => res.redirect(`/crud/detail/${id}`))
    .catch(error => console.log(error))
})

//刪除功能
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  return restaurantModel.findOne({ id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/user'))
    .catch(error => console.log(error))
})



// 匯出路由模組
module.exports = router

