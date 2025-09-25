// ========================
// Toggle Menu
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const nav = document.querySelector(".links");

  if (menu && nav) {
    menu.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }
});

// ========================
// Cart Logic
// ========================

// Get cart from localStorage or start empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart buttons
const buttons = document.querySelectorAll(".add-to-cart");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const id = button.getAttribute("data-id");
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  });
});

// ========================
// Update Cart Display
// ========================
function updateCart() {
  const cartContainer = document.getElementById("cart-details");
  const cartTotal = document.getElementById("cart-total");

  if (!cartContainer || !cartTotal) return;

  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>No items yet.</p>";
  } else {
    cart.forEach(item => {
      total += item.price * item.quantity;

      const div = document.createElement("div");
      div.classList.add("cart-item");

      div.innerHTML = `
        <input type="checkbox" class="item-checkbox">
        <img src="images/banner image.jpg" alt="${item.name}">
        <div class="cart-item-details">
          <p class="cart-item-name">${item.name}</p>
          <span class="cart-item-price">$${item.price} each</span>
        </div>
        <div class="cart-item-actions">
          <button onclick="changeQuantity('${item.id}', -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity('${item.id}', 1)">+</button>
          <button class="remove-btn" onclick="removeItem('${item.id}')">
            <span class="material-symbols-outlined">delete_sweep</span>
          </button>
        </div>
      `;

      cartContainer.appendChild(div);

      // ✅ Checkbox controls remove button
      const checkbox = div.querySelector(".item-checkbox");
      const removeBtn = div.querySelector(".remove-btn");
      removeBtn.style.display = "none";

      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          removeBtn.style.display = "inline-block";
        } else {
          removeBtn.style.display = "none";
        }
      });
    });
  }

  cartTotal.textContent = `$${total.toFixed(2)}`;
}

// ========================
// Change Quantity
// ========================
function changeQuantity(id, change) {
  const item = cart.find(p => p.id === id);

  if (item) {
    item.quantity += change;

    if (item.quantity <= 0) {
      cart = cart.filter(p => p.id !== id);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  }
}

// ========================
// Remove Item
// ========================
function removeItem(id) {
  cart = cart.filter(p => p.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

// ========================
// Load cart when page loads
// ========================
document.addEventListener("DOMContentLoaded", updateCart);
