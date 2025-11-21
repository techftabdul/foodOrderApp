import { menuArray } from "./data.js";

const foodMenu = document.getElementById("food-menu");

function renderMenu(menuArray) {
  let menuHTML = "";
  menuArray.map((item) => {
    menuHTML += `
    <div class="container">
      <div class="menu-item">
        <div class="left-side">
          <span class="emoji">${item.emoji}</span>
          <div class="item-details">
            <h3 class="item-name">${item.name}</h3>
            <p class="item-ingredients">${item.ingredients.join(", ")}</p>
            <p class="item-price">$${item.price}</p>
          </div>
        </div>
        <div class="right-side">
          <button class="add-btn" data-item-id="${item.id}">+</button>
        </div>
      </div>
    </div>
    `;
  });
  foodMenu.innerHTML = menuHTML;
}

renderMenu(menuArray);

// handling add to order button clicks

let orderArray = [];

document.addEventListener("click", handleAddButtonClick);

function handleAddButtonClick(event) {
  if (event.target.classList.contains("add-btn")) {
    const itemId = event.target.dataset.itemId;
    addToOrder(itemId);
  }
}

function addToOrder(itemId) {
  const itemToAdd = menuArray.find((item) => item.id === Number(itemId));
  if (itemToAdd) {
    orderArray.push(itemToAdd);
    renderOrder();
  }
}

const orderList = document.getElementById("order-list");
const totalPriceEl = document.getElementById("total-price");

function renderOrder() {
  let orderHTML = "";
  let totalPrice = 0;

  orderArray.map((item, index) => {
    orderHTML += `
      <div class="order-item">
        <span class="item-name">${item.name}</span>
        <span class="item-price">$${item.price}</span>
        <button class="remove-btn" data-item-index="${index}">Remove</button>
      </div>
    `;
    totalPrice += item.price;
  });

  orderList.innerHTML = orderHTML;
  totalPriceEl.textContent = `Total: $${totalPrice}`;
}

document.addEventListener("click", handleRemoveButton);

function handleRemoveButton(event) {
  if (event.target.classList.contains("remove-btn")) {
    const itemIndex = event.target.dataset.itemIndex;
    removeFromOrder(itemIndex);
  }
}

function removeFromOrder(itemIndex) {
  orderArray.splice(itemIndex, 1);
  renderOrder();
}

// Handling place order button click and payment modal

document.addEventListener("click", handlePlaceOrderButton);
const paymentModal = document.getElementById("payment-modal");

function handlePlaceOrderButton(event) {
  if (event.target.id === "place-order-btn") {
    {
      paymentModal.classList.remove("hidden");
    }
  } else if (event.target.id === "close-modal") {
    paymentModal.classList.add("hidden");
  }
}

// Handling payment form submission

const payNow = document.getElementById("payment-form");
payNow.addEventListener("submit", handlePaymentSubmit);

function handlePaymentSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById("name-input").value;
  const emailInput = document.getElementById("email-input").value;

  paymentModal.classList.add("hidden");

  orderArray = [];
  renderOrder();

  document.getElementById(
    "order"
  ).innerHTML = `Thank you, ${nameInput}! Your order is on its way! A confirmation email has been sent to ${emailInput}.`;
}

const date = new Date();
const year = date.getFullYear();
document.getElementById(
  "copyright-text"
).textContent = `© ${year} Order Now. All rights reserved.`;
