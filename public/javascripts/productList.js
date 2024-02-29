import { menData, womenData } from "./data.js";

var proWrapper = document.getElementById('pro-wrapper');
var menBtn = document.getElementById('men');
var womenBtn = document.getElementById('women');
var headline = document.getElementById('headline');


document.addEventListener("DOMContentLoaded", function () {

  menData.forEach((product) => {
    const productTemplate = createProductTemplate(product);
    // Append the template to the product container
    proWrapper.innerHTML += productTemplate;
    console.log(productTemplate)

  })

});


menBtn.addEventListener("click", function () {
  // proWrapper.innerHTML = "";
  headline.innerHTML = "Men's Clothing from Anime Aura";

  menData.forEach((product) => {
    const productTemplate = createProductTemplate(product);
    // Append the template to the product container
    proWrapper.innerHTML += productTemplate;

  })
});

womenBtn.addEventListener("click", function () {
  proWrapper.innerHTML = "";
  headline.innerHTML = "Women's Clothing from Anime Aura";

  womenData.forEach((product) => {
    const productTemplate = createProductTemplate(product);
    // Append the template to the product container
    proWrapper.innerHTML += productTemplate;
  })
});

function onButtonChange(categoryType) {
  console.log("Pop");
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


// Function to create product HTML template
function createProductTemplate(product) {
  return `
  <a href="/product/show"><div class="pro-card w-[290px] h-[400px] bg-gray-100 p-3 rounded-md">
    <img
      class="h-[290px] rounded-xl w-full shadow-lg shadow-gray-400 object-cover"
      src=${product.imageUrl}
      alt="pro1"
    />

    <div class="mt-4">
      <h1 class="text-zinc-800 font-semibold">${product.title.length > 25 ? product.title.slice(0, 25) + '...' : product.title}</h1>
      <h2 class="text-gray-500">${product.category}</h2>
      <span class="text-teal-600 text-xl font-bold"
        ><b class="text-gray-600">Rs. </b>${product.price}</span
      >
    </div>
  </div>  </a>
  `;
}

