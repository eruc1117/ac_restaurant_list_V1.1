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

function forHandlebasIf(array) {//先對資料進行處理，增加sameName作為key，名稱和英文名稱(name and name_en)完全相同value為false，不同為true
  let list = array.results

  for (let index = 0; index < list.length; index++) {

    if (list[index].name === list[index].name_en) {
      list[index].sameName = false
    } else {
      list[index].sameName = true
    }
  }
  return list
}
//將模組輸出
module.exports = {
  removeBlank,
  forHandlebasIf
}