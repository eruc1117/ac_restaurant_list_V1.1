//設定express環境
const express = require('express')
const app = express()
const port = 3000

//載入handlebars
const exhdbs = require('express-handlebars')

const handlebars = exhdbs.create({
})

//載入mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant_test')

//載入restaurantModel
const restaurantModel = require('./models/restaurantModel')


//載入modules，使用自製模組
const modules = require('./modules')

//設定使用handlebars
//express-handlebars ^5到^6的改動
app.engine('.handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.set('views', './views');


//使用public設定
app.use(express.static('public'))
//表單資料處理
app.use(express.urlencoded({ extended: true }))
//get取得頁面
app.get('/', (req, res) => {
  restaurantModel.find()
    .lean()
    .then(restaurantList => res.render('index', { restaurantList }))
    .catch(error => console.error(error))
})
//顯示餐廳詳細資料
app.get('/restaurants/detail/:id', (req, res) => {
  const id = req.params.id
  return restaurantModel.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})

//修改頁面
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return restaurantModel.findById(id)
    .lean()
    .then(restaurant => res.render('addrestaurant', { restaurant }))
    .catch(error => console.error(error))
})

app.post('/restaurants/edit/:id', (req, res) => {
  //肯定能用array處理，不過資料庫格式要改嗎？
  const id = req.params.id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.GoogleMap
  const rating = req.body.rating
  const description = req.body.description
  return restaurantModel.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/detail/${id}`))
    .catch(error => console.log(error))
})

//搜索功能
app.get('/search', (req, res) => {
  const searchResult = req.query.keyword
  const keyword = modules.removeBlank(req.query.keyword).toLowerCase()
  const restaurantList = restaurantListJson.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword) || restaurant.name_en.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes()
    //思考了一下關於這裡name跟name_en的優先順序，首先filter會篩選出true的項目，由於name在||前，當name符合keyword時先回傳值，此時不會對name_en進行驗證，所以優先程度上是以name為優先
  })
  restaurantList.length === 0 ? res.render('nonSearchResult', { searchResult }) : res.render('index', { restaurantList, searchResult })
})

//設定port
app.listen(port, () => {
  console.log(`localhost:${port}`)
})