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

    // Day 2: Add to Cart button and hover zoom
    var cartBtn = document.createElement("button");
    cartBtn.textContent = "Add to Cart";
    cartBtn.className = "cart-btn";
    cartBtn.setAttribute("data-name", p.name);
    if (p.stock === 0) {
      cartBtn.disabled = true;
    }
    cartBtn.addEventListener("click", addToCart);
    card.appendChild(cartBtn);

    card.addEventListener("mouseenter", zoomIn);
    card.addEventListener("mouseleave", zoomOut);

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

// ================= DAY 2 - Event Handling =================
var searchBox = document.getElementById("searchBox");
var cartMessage = document.getElementById("cartMessage");
var formMessage = document.getElementById("formMessage");
var enquiryForm = document.getElementById("enquiryForm");

// Task 1 + 2: click on Add to Cart
function addToCart(event) {
  console.log(event);
  // Three properties of this event object:
  // event.type   -> "click" (the kind of event)
  // event.target -> the button that was clicked
  // event.clientX -> where on the screen the mouse was
  var name = event.target.getAttribute("data-name");
  cartMessage.textContent = name + " added to cart!";
}

// mouse hover: add and remove the zoom class
function zoomIn(event) {
  console.log(event);
  // event.type -> "mouseenter", event.currentTarget -> the card, event.relatedTarget -> element the mouse came from
  event.currentTarget.classList.add("zoom");
}
function zoomOut(event) {
  console.log(event);
  // event.type -> "mouseleave", event.currentTarget -> the card, event.timeStamp -> when it happened
  event.currentTarget.classList.remove("zoom");
}

// key press in the search box
searchBox.addEventListener("keydown", function (event) {
  console.log(event);
  // event.type -> "keydown", event.key -> which key ("Enter", "Escape"), event.target -> the search box
  if (event.key === "Enter") {
    cartMessage.textContent = "You searched for: " + searchBox.value;
  }
  if (event.key === "Escape") {
    searchBox.value = "";
    cartMessage.textContent = "";
    applyFilters();
  }
});

// Task 3: stop the form from reloading the page
enquiryForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(event);
  // event.type -> "submit", event.target -> the form, event.defaultPrevented -> true now
  formMessage.textContent = "Form submitted (the page did not reload).";
});
// Why addEventListener is better than the onclick attribute:
// 1. we can attach many listeners to the same element (onclick keeps only one)
// 2. the JavaScript stays in app.js and the HTML stays clean
// 3. we can remove a listener later with removeEventListener

// ================= DAY 4 - Arrays and Objects =================

// Task 1: student scores
var students = [
  { name: "Anu", roll: 1, mark: 78 },
  { name: "Bibin", roll: 2, mark: 35 },
  { name: "Catherine", roll: 3, mark: 92 },
  { name: "Dev", roll: 4, mark: 56 },
  { name: "Esha", roll: 5, mark: 41 }
];

var studentNames = students.map(function (s) { return s.name; });
var passedStudents = students.filter(function (s) { return s.mark >= 40; });
var totalMarks = students.reduce(function (sum, s) { return sum + s.mark; }, 0);
var averageMark = totalMarks / students.length;
console.log("Names:", studentNames);
console.log("Passed:", passedStudents);
console.log("Total:", totalMarks, "Average:", averageMark);

// Task 2: find, some, every, Object.keys, Object.entries
var highest = Math.max.apply(null, students.map(function (s) { return s.mark; }));
var topper = students.find(function (s) { return s.mark === highest; });
var anyFailed = students.some(function (s) { return s.mark < 40; });
var allAbove30 = students.every(function (s) { return s.mark > 30; });
console.log("Topper:", topper.name);
console.log("Anyone failed?", anyFailed, "| Everyone above 30?", allAbove30);

var oneStudent = students[0];
console.log("Keys:", Object.keys(oneStudent));
var pairs = Object.entries(oneStudent);
for (var k = 0; k < pairs.length; k++) {
  console.log(pairs[k][0] + " = " + pairs[k][1]);
}

// same methods on the products array
var productNames = products.map(function (p) { return p.name; });
var inStock = products.filter(function (p) { return p.stock > 0; });
var stockValue = products.reduce(function (sum, p) { return sum + p.price * p.stock; }, 0);
console.log("Product names:", productNames);
console.log("In stock:", inStock);
console.log("Total stock value: Rs.", stockValue);

// Task 3: search and category filter working together
var categoryFilter = document.getElementById("categoryFilter");

function applyFilters() {
  var text = searchBox.value.toLowerCase();
  var chosen = categoryFilter.value;

  var result = products.filter(function (p) {
    var nameMatches = p.name.toLowerCase().includes(text);
    var categoryMatches = (chosen === "all") || (p.category === chosen);
    return nameMatches && categoryMatches;   // both must be true
  });

  renderProducts(result);
}
searchBox.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);

