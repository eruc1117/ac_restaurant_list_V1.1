require('dotenv').config()
//設定express環境
const express = require('express')
const app = express()


const session = require('express-session')
const usePassport = require('./config/passport')
// 引用路由器
const routes = require('./routes')


//載入methodoverride
const methodOverride = require('method-override')
//載入connect-flash
const flash = require('connect-flash')
//載入handlebars
const exhdbs = require('express-handlebars')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const port = process.env.PORT
const handlebars = exhdbs.create({
})

//連線mongoose
require('./config/mongoose')

//設定使用handlebars
//express-handlebars ^5到^6的改動
app.engine('.handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.set('views', './views');

app.use(session({
  secret: process.env.SESSION_SECRET,
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
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()//true or false
  res.locals.user = req.user // passport.js 中User.findOne({ email }),user回傳
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  res.locals.msg = req.session.messages// passport.js 中done(null, false, { message: 'That email is not registered!' })的message回傳
  next()
})
// 將 request 導入路由器
app.use(routes)

//設定port
app.listen(port, () => {
  console.log(`localhost:${port}`)
})