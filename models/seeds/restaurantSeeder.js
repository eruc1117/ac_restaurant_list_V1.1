const mongoose = require('mongoose')
const restaurantModel = require('../restaurantModel') // 載入 restaurantModel

//載入modules，使用自製模組
const modules = require('../modules')

//載入restaurant.json
const restaurantListJson = require('./restaurant.json')
let restaurantList = modules.predataEdit(restaurantListJson)


mongoose.connect('mongodb://localhost/restaurant_test')
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (element of restaurantList) {
    restaurantModel.create({
      id: element['id'],
      name: element['name'],
      name_en: element['name_en'],
      category: element['category'],
      image: element['image'],
      location: element['location'],
      phone: element['phone'],
      google_map: element['google_map'],
      rating: element['rating'],
      description: element['description'],
      sameName: element['sameName']
    })
  }
  console.log('done')
})