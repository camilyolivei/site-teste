export default function initCart(){
//Cart

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let cartClose = document.querySelector("#close-cart");

//Open cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};

//Close cart
cartClose.onclick = () => {
  cart.classList.remove("active");
};
//cart working JS
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
//making function
function ready() {
  //remove items from cart
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  //quantity change
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  //Add to cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
    button.addEventListener("touchstart", addCartClicked);
    updateTotal();
  }
  //buy button work
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}
//
function buyButtonClicked() {
  alert("Seu pedido foi feito com sucesso");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}
//add to cart
function addCartClicked(event) {
  updateTotal();
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerHTML;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  console.log(productImg)
  addProductToCart(title, price, productImg);
  updateTotal();
}
function addProductToCart(title, price, productImg) {
  updateTotal();
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box"); //pegar o container do item//
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerHTML == title) {
      alert("Produto ja adicionado no carrinho!");
      return;
    }
  }

  var cartBoxContent = `
<img src="${productImg}" alt="" class="cart-img">
<div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity">
</div>
<!--Remove-->
<i class="fa-solid fa-trash cart-remove"></i>
`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}
//remove items from cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}
//update Total
function updateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("R$ ", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  //if price
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText = "R$" + total;
  //
}}
