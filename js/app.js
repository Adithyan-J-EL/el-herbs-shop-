// EL Herbs and Spices Shop - main script

// Our product data (an array of objects)
var products = [
  { name: "Turmeric Powder", price: 60, stock: 25, category: "Spice Powder" },
  { name: "Black Pepper", price: 90, stock: 0, category: "Whole Spice" },
  { name: "Cardamom", price: 120, stock: 12, category: "Whole Spice" },
  { name: "Cinnamon Sticks", price: 80, stock: 30, category: "Whole Spice" },
  { name: "Coriander Powder", price: 70, stock: 0, category: "Spice Powder" },
  { name: "Bay Leaves", price: 40, stock: 18, category: "Herb" },
  { name: "Cloves", price: 105, stock: 9, category: "Whole Spice" }
];

// ================= DAY 1 - DOM Manipulation =================

// Task 1: select by id, change text, change image, toggle a class
var heading = document.getElementById("shopHeading");
var shopImage = document.getElementById("shopImage");
var changeBtn = document.getElementById("changeBtn");

function changePage() {
  heading.textContent = "Welcome to EL Herbs and Spices Shop";  // changes the text
  shopImage.setAttribute("src", "images/spices2.svg");           // changes the image
  heading.classList.toggle("highlight");                         // adds the class, or removes it if already there
}
changeBtn.onclick = changePage;

// Task 2: build a card for every product
var productGrid = document.getElementById("productGrid");

function renderProducts(list) {
  productGrid.textContent = "";   // clear old cards first

  for (var i = 0; i < list.length; i++) {
    var p = list[i];

    var card = document.createElement("div");
    card.className = "product-card";
    if (p.stock === 0) {
      card.classList.add("out-of-stock");
    }

    var nameTag = document.createElement("h3");
    nameTag.textContent = p.name;
    var priceTag = document.createElement("p");
    priceTag.textContent = "Price: Rs. " + p.price;
    var stockTag = document.createElement("p");
    stockTag.textContent = "Stock: " + p.stock;
    var catTag = document.createElement("p");
    catTag.textContent = "Category: " + p.category;

    card.appendChild(nameTag);
    card.appendChild(priceTag);
    card.appendChild(stockTag);
    card.appendChild(catTag);


    productGrid.appendChild(card);
  }
}
renderProducts(products);

// Task 3: corrected program
// Mistake 1: document.querySelector("productGrid") has no #, so it looks for a tag
// called productGrid. Correct version:
var gridBox = document.querySelector("#productGrid");
// Mistake 2: getElementById("product-card") searches an id, but product-card is a
// class name. Correct version uses the class selector:
var allCards = document.querySelectorAll(".product-card");
// Mistake 3: allCards.style.border = ... does not work because allCards is a NodeList
// (a list of elements). Loop over it and style each element:
for (var c = 0; c < allCards.length; c++) {
  allCards[c].style.borderRadius = "8px";
}
// textContent vs innerHTML:
// textContent puts plain text only - anything like <b> is shown as normal text.
// innerHTML reads the text as HTML code, so tags are created as real elements.
// That is risky if the text comes from a user.



