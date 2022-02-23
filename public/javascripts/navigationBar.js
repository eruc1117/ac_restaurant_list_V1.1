const navbar = document.querySelector('#navbar')
let title = navbar.innerText.replace('餐廳清單', "")
if (title.length !== 0) {
  navbar.innerText = `${title}的餐廳清單`
}

//避免未取名的使用者的導覽標題多一個的，由於導覽列是直接由app.use((req, res, next) => {....}來賦值，認為在這邊進行改動較好
