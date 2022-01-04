# ac_restaurant_list
顯示全部餐廳(簡單資料)，或是點擊後顯示詳細資料



### Function list

- 能以中文或英文的店名進行搜尋
- 點擊餐廳顯示詳細資料
- 點擊左上角我的餐廳清單回到初始頁面(顯示全部餐廳)

### Installing

需要下列環境
```
"node.js"
"express": "^4.17.2",
"express-handlebars": "^3.0.0"
```
開啟終端機(Terminal)，cd到存放專案本機位置並執行
```
git clone https://github.com/eruc1117/ac_restaurant_list.git
```
下載專案後再次cd到ac_restaurant_list，再往下進行<br>
express 安裝步驟
```
npm init -y
npm i express
```
安裝 express handlebars
```
npm i express-handlebars@3.0.0 
```
執行
```
nodemon app.js
```
將terminal顯示的localhost:3000貼到網頁上執行

## Running the tests
顯示全數餐廳(或是搜尋結果)
![image](index.png)
顯示餐廳詳細資料
![image](show.png)
顯示無搜尋結果的頁面
![image](NonsearchResult.png)

## 顯示方式不合預期
![image](wow.png)
直覺是從左到右，看起來似乎是右到左

