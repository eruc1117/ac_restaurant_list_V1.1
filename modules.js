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

//將模組輸出
module.exports = {
  removeBlank,
}