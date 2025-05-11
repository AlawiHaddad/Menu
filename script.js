let cart = [];
let currentRestaurant = null; // لتتبع المطعم المختار

// تحميل بيانات المطاعم من ملف JSON
fetch('restaurants.json')
  .then(response => response.json())
  .then(restaurants => {
    const container = document.getElementById('restaurants-container');
    restaurants.forEach(restaurant => {
      const restaurantDiv = document.createElement('div');
      restaurantDiv.classList.add('restaurant');

      const logo = document.createElement('img');
      logo.src = restaurant.logo;
      logo.alt = restaurant.name;
      restaurantDiv.appendChild(logo);

      const name = document.createElement('h2');
      name.textContent = restaurant.name;
      restaurantDiv.appendChild(name);

      restaurant.categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');

        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = category.name;
        categoryDiv.appendChild(categoryTitle);

        const itemsList = document.createElement('ul');
        category.items.forEach(item => {
          const itemLi = document.createElement('li');
          itemLi.classList.add('item');

          const itemName = document.createElement('span');
          itemName.textContent = item.name;
          itemLi.appendChild(itemName);

          const itemPrice = document.createElement('span');
          itemPrice.textContent = ` - ${item.price} ريال`;
          itemLi.appendChild(itemPrice);

          const itemImage = document.createElement('img');
          itemImage.src = item.image;
          itemImage.alt = item.name;
          itemImage.style.width = '50px';
          itemLi.appendChild(itemImage);

          const addButton = document.createElement('button');
          addButton.textContent = 'إضافة إلى السلة';
          addButton.onclick = () => {
            cart.push({ name: item.name, price: item.price });
            currentRestaurant = restaurant; // تحديد المطعم عند الإضافة
            updateCartDisplay();
          };
          itemLi.appendChild(addButton);

          itemsList.appendChild(itemLi);
        });

        categoryDiv.appendChild(itemsList);
        restaurantDiv.appendChild(categoryDiv);
      });

      container.appendChild(restaurantDiv);
    });
  });

// تحديث عرض السلة
function updateCartDisplay() {
  const list = document.getElementById('cart-list');
  const totalElem = document.getElementById('total-price');
  list.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.price} ريال`;
    list.appendChild(li);
    total += item.price;
  });

  totalElem.textContent = total;
}

// إنشاء رسالة الطلب للواتساب
function generateOrderMessage(restaurant) {
  let message = `مرحباً، أرغب في الطلب من ${restaurant.name}:\n\n`;
  cart.forEach(item => {
    message += `- ${item.name} (${item.price} ريال)\n`;
  });
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  message += `\nالإجمالي: ${total} ريال`;
  return message;
}

// زر تأكيد الطلب في أسفل الصفحة
document.getElementById('order-button').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('السلة فارغة، يرجى اختيار عناصر أولاً.');
    return;
  }
  if (!currentRestaurant) {
    alert('يرجى اختيار المطعم أولاً.');
    return;
  }
  const message = generateOrderMessage(currentRestaurant);
  window.open(`https://wa.me/${currentRestaurant.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
});