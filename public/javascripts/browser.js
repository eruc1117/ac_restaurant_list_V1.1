document.addEventListener('click', function (e) {

  if (e.target.classList.contains("edit-me")) {
    let ratingNumber = document.querySelector('#exa')
    console.log(ratingNumber.value)
    let rating = document.querySelector('#rating')
    rating.innerHTML = ratingNumber.value
  };
});