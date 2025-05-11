let currentMenu = [];
let cart = [];

function loadRestaurants() {
  fetch('restaurants.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('restaurants-container');
      container.innerHTML = '';
      data.restaurants.forEach(restaurant => {
        const div = document.createElement('div');
        div.classList.add('restaurant-card');
        div.textContent = restaurant.name;
        div.onclick = () => showMenu(restaurant);
        container.appendChild(div);
      });
    });
}

function showMenu(restaurant) {
  currentMenu = restaurant.menu;
  const container = document.getElementById('menu-container');
  container.innerHTML = `<h2>${restaurant.name}</h2>`;
  restaurant.menu.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('menu-item');
    div.innerHTML = `
      <span>${item.name} - ${item.price} ريال</span>
      <button onclick="addToCart('${item.name}', ${item.price})">+</button>
    `;
    container.appendChild(div);
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
  const container = document.getElementById('cart-container');
  container.innerHTML = '<h3>السلة</h3>';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    container.innerHTML += `
      <div>${item.name} x ${item.quantity} = ${item.price * item.quantity} ريال</div>
    `;
  });
  container.innerHTML += `<strong>الإجمالي: ${total} ريال</strong>`;
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