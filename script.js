let currentMenu = [];
let cart = [];

function loadRestaurants() {
  fetch('restaurants.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('restaurants-container');
      container.innerHTML = '';
      data.forEach(restaurant => {
        const div = document.createElement('div');
        div.classList.add('restaurant-card');
        div.textContent = restaurant.name;
        div.onclick = () => showMenu(restaurant);
        container.appendChild(div);
      });
    })
    .catch(error => console.error('Error loading restaurants:', error));
}

function showMenu(restaurant) {
  currentMenu = restaurant.categories;
  const container = document.getElementById('menu-container');
  container.innerHTML = `<h2>${restaurant.name}</h2>`;
  restaurant.categories.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');
    categoryDiv.innerHTML = `<h3>${category.name}</h3>`;
    category.items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('menu-item');
      itemDiv.innerHTML = `
        <span>${item.name} - ${item.price} ريال</span>
        <button onclick="addToCart('${item.name}', ${item.price})">+</button>
      `;
      categoryDiv.appendChild(itemDiv);
    });
    container.appendChild(categoryDiv);
  });
}

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++; 
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  const container = document.getElementById('cart-list');
  container.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    container.innerHTML += `
      <li>${item.name} x ${item.quantity} = ${item.price * item.quantity} ريال</li>
    `;
  });
  document.getElementById('total-price').textContent = total;
}

function confirmOrder() {
  if (cart.length === 0) return;
  let message = 'طلب جديد:\n';
  cart.forEach(item => {
    message += `${item.name} x ${item.quantity} = ${item.price * item.quantity} ريال\n`;
  });
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  message += `الإجمالي: ${total} ريال`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

document.getElementById('order-button').onclick = confirmOrder;