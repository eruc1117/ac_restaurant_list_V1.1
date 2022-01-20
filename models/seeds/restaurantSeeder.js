const db = require('../../config/mongoose')
//載入modules，使用自製模組
const modules = require('../modules')

//載入restaurant.json
const restaurantListJson = require('./restaurant.json')
let restaurantList = modules.predataEdit(restaurantListJson)

//載入restaurantModel
const restaurantModel = require('../restaurantModel')

//製作種子資料
db.once('open', () => {
  console.log('mongodb connected!')
  for (element of restaurantList) {
    restaurantModel.create(element)
  }
  console.log('done')
})