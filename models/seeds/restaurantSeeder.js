require('dotenv').config()
const db = require('../../config/mongoose')
//載入modules，使用自製模組
const modules = require('../modules')
const bcrypt = require('bcryptjs')
//載入restaurantModel
const restaurantModel = require('../restaurantModel')
//載入user
const user = require('../user')
//設定user資料
const userLIst = [
  {
    email: 'user1@example.com',
    password: 12345678
  },
  {
    email: 'user2@example.com',
    password: 12345678
  }
]
//載入restaurant.json
const restaurantListJson = require('./restaurant.json')
let restaurantList = modules.predataEdit(restaurantListJson)


//製作種子資料

db.once('open', () => {
  userLIst.forEach(element => createUser(element))
  restaurantList.forEach(element => createRestaurantSeed(element))
})
async function createUser(element) {
  const salt = await bcrypt.genSaltSync(10)
  const hash = await bcrypt.hash(element.password.toString(), salt)
  await user.create({
    email: element.email,
    password: hash
  })
}


async function createRestaurantSeed(element) {
  const what = await user.findOne({ email: 'user1@example.com' })//完全搞不明白為啥第一個await不起作用
  const userOne = await user.findOne({ email: 'user1@example.com' })
  const userTwo = await user.findOne({ email: 'user2@example.com' })
  if (element.id === 1 || element.id === 2 || element.id === 3) {
    element['userId'] = userOne['_id']
    await restaurantModel.create(element)
  }
  if (element.id === 4 || element.id === 5 || element.id === 6) {
    element['userId'] = userTwo['_id']
    await restaurantModel.create(element)
  }
}


