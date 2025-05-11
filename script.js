// تحميل بيانات المطاعم من ملف JSON
fetch('restaurants.json')
  .then(response => response.json())
  .then(restaurants => {
    // عرض جميع المطاعم في الصفحة
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
      
      // عرض قائمة الطعام والمشروبات
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
          itemLi.appendChild(itemImage);
          
          itemsList.appendChild(itemLi);
        });
        
        categoryDiv.appendChild(itemsList);
        restaurantDiv.appendChild(categoryDiv);
      });
      
      // إضافة زر لطلب الطعام عبر الواتساب
      const orderButton = document.createElement('button');
      orderButton.textContent = 'اطلب عبر الواتساب';
      orderButton.addEventListener('click', () => {
        const orderMessage = generateOrderMessage(restaurant);
        window.open(`https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(orderMessage)}`, '_blank');
      });
      restaurantDiv.appendChild(orderButton);
      
      container.appendChild(restaurantDiv);
    });
  });

// دالة لتوليد رسالة الطلب عبر الواتساب
function generateOrderMessage(restaurant) {
  let message = `أهلاً، أريد طلب الطعام من ${restaurant.name}:\n`;
  restaurant.categories.forEach(category => {
    category.items.forEach(item => {
      message += `${item.name} - ${item.price} ريال\n`;
    });
  });
  return message;
}