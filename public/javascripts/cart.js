let cartData = [
  {
    id: "m1",
    title: 'Naruto: Ghost of Uchiha',
    category: 'Oversized T-Shirts',
    quantity: 1,
    price: 799,
    imageUrl: '/public/assets/product/m1.webp',
  },
  {
    id: "m2",
    title: 'Naruto: Battle Ready',
    category: 'Oversized T-Shirts',
    quantity: 1,
    price: 999,
    imageUrl: '/public/assets/product/m2.webp',

  },
  {
    id: 'm3',
    title: 'Naruto: Yin-Yang',
    category: 'Oversized T-Shirt',
    quantity: 1,
    price: 899,
    imageUrl: '/public/assets/product/m3.webp',
  },
];

var cartWrapper = document.getElementById('cart-wrapper');
var summary = document.getElementById('summary');

document.addEventListener('DOMContentLoaded', function () {
  let totalPrice = 0;

  cartData.forEach((product) => {
    totalPrice += (product.price * product.quantity);
    const productTemplate = createProductTemplate(product);
    // Append the template to the product container
    cartWrapper.innerHTML += productTemplate;
  });

  summary.querySelector(`#subTotal`).innerHTML = totalPrice;
  summary.querySelector(`#total`).innerHTML = totalPrice == 0 ? 0 : totalPrice + 100;
})


function onQuantityChange(type, productId) {
  var currProduct = {};
  let newCartData = [];
  if (type === 'inc') {
    newCartData = cartData.map((product) => {
      if (product.id == productId) {
        currProduct = {
          ...product,
          quantity: product.quantity >= 1 ? product.quantity + 1 : 1,
        };
        return currProduct;
      }
      return product;
    })
  }
  else {
    newCartData = cartData.map((product) => {
      if (product.id === productId) {
        currProduct = {
          ...product,
          quantity: product.quantity > 1 ? product.quantity - 1 : 1,
        };
        return currProduct;
      }
      return product;
    })
  }

  cartData = newCartData;

  let totalPrice = 0;
  cartData.forEach((product) => totalPrice += (product.price * product.quantity));

  cartWrapper.querySelector(`#${productId}`).querySelector('#total').innerHTML = currProduct.quantity * currProduct.price;
  summary.querySelector(`#subTotal`).innerHTML = totalPrice;
  summary.querySelector(`#total`).innerHTML = totalPrice == 0 ? 0 : totalPrice + 100;

}


function removeProduct(productId) {
  let newCartData = [];
  newCartData = cartData.filter((product) => product.id !== productId);
  cartData = newCartData;

  let totalPrice = 0;
  cartWrapper.innerHTML = "";
  cartData.forEach((product) => {
    totalPrice += (product.price * product.quantity);
    const productTemplate = createProductTemplate(product);
    // Append the template to the product container
    cartWrapper.innerHTML += productTemplate;
  });

  summary.querySelector(`#subTotal`).innerHTML = totalPrice;
  summary.querySelector(`#total`).innerHTML = totalPrice == 0 ? 0 : totalPrice + 100;
}


// Function to create product HTML template
function createProductTemplate(product) {
  return `
  <div id='${product.id}' class="card flex items-center">
    <img
      class="h-36 object-cover rounded-xl"
      src=${product.imageUrl}
      alt="product"
    />

    <div class="flex flex-col gap-3 md:flex-row md:gap-0 w-full px-4 md:px-6 justify-between">
      <div class="flex flex-col gap-2 font-poppins font-medium">
        <h1 class="max-w-[400px] md:text-xl">
          ${product.title}
        </h1>
        <h2 class="text-zinc-500">${product.category}</h2>

        <!-- Quantity -->
        <div class="flex items-center gap-4 text-zinc-500 cursor-pointer">
          <h1 class="font-comfortaa text-gray-200">Quantity :</h1>
          <button onclick="onQuantityChange('dec','${product.id}')" class="border-[1px] w-8 h-8 rounded-md border-zinc-600">
            <ion-icon name="remove-outline" />
          </button>
          <span class="text-gray-100 font-semibold text-xl">${product.quantity}</span>
          <button onclick="onQuantityChange('inc','${product.id}')" class="border-[1px] w-8 h-8 rounded-md border-zinc-600">
            <ion-icon name="add-outline" />
          </button>
        </div>
      </div>

      <span class="text-xl md:text-2xl font-poppins font-medium">
        Rs.
        <b id="total" class="text-2xl md:text-3xl text-lime-500">${product.quantity * product.price}</b>
      </span>
    </div>
    <span onclick="removeProduct('${product.id}')" class="text-sm h-full rounded-r-md hover:bg-red-600 cursor-pointer">
      <ion-icon name="close-outline" />
    </span>
  </div> 
  `;
}

