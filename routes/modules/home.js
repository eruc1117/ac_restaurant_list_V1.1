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

router.get('/:sortName', (req, res) => {
  let sortfunction
  const sortName = req.params.sort
  sortName === 'atoz' ?
    sortfunction = { name: 1 } :
    sortName === 'ztoa' ?
      sortfunction = { name: -1 } :
      sortName === 'category' ?
        sortfunction = { category: 1 } :
        sortName === 'area' ?
          sortfunction = { location: 1 } :
          sortfunction = { id: 1 }
  restaurantModel.find()
    .lean()
    .sort(sortfunction)
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
