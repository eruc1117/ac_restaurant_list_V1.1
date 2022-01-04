//設定express環境
const express = require('express')
const app = express()
const port = 3000
//載入handlebars
const exhdbs = require('express-handlebars')
//設定使用handlebars
app.engine('handlebars', exhdbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//使用public設定
app.use(express.static('public'))
//get取得頁面
app.get('/', (req, res) => {
  res.render('index')
})
//設定port
app.listen(port, () => {
  console.log(`localhost:${port}`)
})