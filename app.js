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

//載入restaurantModel
const restaurantModel = require('./models/restaurantModel')
mongoose.connect('mongodb://localhost/restaurant_test')

//載入modules，使用自製模組
const modules = require('./modules')

//設定使用handlebars
//express-handlebars ^5到^6的改動
app.engine('.handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.set('views', './views');


//使用public設定
app.use(express.static('public'))
//get取得頁面
app.get('/', (req, res) => {
  restaurantModel.find()
    .lean()
    .then(restaurantList => res.render('index', { restaurantList }))
    .catch(error => console.error(error))
})
//顯示餐廳詳細資料
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.find(element => element.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant })
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