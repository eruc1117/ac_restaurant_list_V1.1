function removeBlank(word) {//Integrate related remove blank function
  let wordArray = word.split(' ')
  while (wordArray[0] === '') {//處理開頭的空白
    wordArray.shift()
  }
  while (wordArray[(wordArray.length - 1)] === '') {//處理尾端的空白
    wordArray.pop()
  }
  return creatKeyWords(wordArray)
}


function creatKeyWords(array) {//重構文字，保留詞之間的空白
  let words = ``
  let blank = 1
  for (let index = 0; index < (array.length); index++) {
    if (blank === 1) {
      words += `${array[index]}`
      blank = 0
    } else if (blank === 0) {
      words += ` ${array[index]}`
      blank = 1
    }
  }
  return words
}

function predataEdit(array) {
  let list = array.results
  for (let index = 0; index < list.length; index++) {
    //補充對電話號碼格式的修改，比較符合習慣
    let newPhone = list[index].phone.replace(/[\s]/g, '-')
    list[index].phone = newPhone
    //先對資料進行處理，增加sameName作為key，名稱和英文名稱(name and name_en)完全相同value為false，不同為true
    list[index].name === list[index].name_en ?
      list[index].sameName = false :
      list[index].sameName = true
  }
  return list
}

function bodyDataEdit(listBody) {
  listBody.name = removeBlank(listBody.name)
  listBody.name_en = removeBlank(listBody.name_en)
  listBody.category = removeBlank(listBody.category)
  listBody.location = removeBlank(listBody.location)
  listBody.description = removeBlank(listBody.description)
  listBody.name === listBody.name_en ?
    listBody.sameName = false :
    listBody.sameName = true
  listBody
  return listBody
}



//將模組輸出
module.exports = {
  removeBlank,
  predataEdit,
  bodyDataEdit
}