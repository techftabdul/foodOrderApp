import { menuArray } from "./data.js";
// console.log(menuArray);

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

const date = new Date();
const year = date.getFullYear();
document.getElementById(
  "copyright-text"
).textContent = `© ${year} Order Now. All rights reserved.`;
