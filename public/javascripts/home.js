// to set men button as default
document.addEventListener("DOMContentLoaded", function () {
    const men = document.getElementById('men');
    men.style.backgroundColor = "#fff";
    men.style.color = "black";
    men.style.borderColor = "red";
  })
  
  
  function onButtonChange(categoryType) {
    var category = ['men', 'women'];
    var gender;
    category.forEach((value) => {
      gender = document.getElementById(value);
      if (categoryType === value) {
        gender.style.backgroundColor = "#fff";
        gender.style.color = "black";
        gender.style.borderColor = "red";
      }
      else {
        gender.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
        gender.style.color = "white";
        gender.style.borderColor = "transparent";
  
      }
    })
  }
  
  
  let nextBtnDom = document.getElementById('next');
  let prevBtnDom = document.getElementById('prev');
  
  let carouselDom = document.querySelector('.carousel');
  let listItemDom = document.querySelector('.carousel .list');
  let thumbnailDom = document.querySelector('.carousel .thumbnail');
  let timerDom = document.querySelector('.carousel .timer');
  
  nextBtnDom.onclick = function () {
    showSlider('next');
  }
  
  prevBtnDom.onclick = function () {
    showSlider('prev');
  }
  
  // animation run time
  let timeRunning = 2000;
  let timeAutoNext = 7000;
  let timer;
  let runTimeout;
  let runAutoRun = setInterval(() => {
    timerDom.classList.add('progress');
    nextBtnDom.click();
    clearTimeout(timer);
    timer = setTimeout(() => {
      timerDom.classList.remove('progress');
    }, 6950);
  }, timeAutoNext);
  
  
  function showSlider(type) {
    let itemSlider = document.querySelectorAll(".carousel .list .item");
    let itemThumbnail = document.querySelectorAll(".carousel .thumbnail .item");
  
  
    if (type === 'next') {
      listItemDom.appendChild(itemSlider[0]);
      thumbnailDom.appendChild(itemThumbnail[0]);
      carouselDom.classList.add('next');
  
    }
    else if (type === 'prev') {
      let size = itemSlider.length - 1;
      listItemDom.prepend(itemSlider[size]);
      thumbnailDom.prepend(itemThumbnail[size]);
      carouselDom.classList.add('prev');
    }
  
    clearTimeout(runTimeout);
    runTimeout = setTimeout(() => {
      carouselDom.classList.remove('next');
      carouselDom.classList.remove('prev');
    }, 2000);
  
  }
  
  
  
  
  
  
  
  
  
  
  
  
  