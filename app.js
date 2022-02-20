//設定express環境
const express = require('express')
const app = express()
const port = 3000

const session = require('express-session')
const usePassport = require('./config/passport')
// 引用路由器
const routes = require('./routes')


//載入methodoverride
const methodOverride = require('method-override')

//載入handlebars
const exhdbs = require('express-handlebars')

const handlebars = exhdbs.create({
})

//連線mongoose
require('./config/mongoose')

//載入restaurantModel
const restaurantModel = require('./models/restaurantModel')


//載入modules，使用自製模組
const modules = require('./models/modules')

//設定使用handlebars
//express-handlebars ^5到^6的改動
app.engine('.handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.set('views', './views');

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

//使用method override
app.use(methodOverride('_method'))

//使用public設定
app.use(express.static('public'))
//表單資料處理
app.use(express.urlencoded({ extended: true }))
usePassport(app)
app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
// 將 request 導入路由器
app.use(routes)





//設定port
app.listen(port, () => {
  console.log(`localhost:${port}`)
})