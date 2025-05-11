const restaurants = [
  {
    name: "مطعم الريف",
    categories: [
      {
        name: "مأكولات يمنية",
        items: [
          {
            name: "مندي دجاج",
            image: "https://via.placeholder.com/250x150?text=مندي+دجاج",
            whatsapp: "https://wa.me/96891234567?text=مرحباً، أود طلب مندي دجاج من مطعم الريف"
          },
          {
            name: "كبسة لحم",
            image: "https://via.placeholder.com/250x150?text=كبسة+لحم",
            whatsapp: "https://wa.me/96891234567?text=مرحباً، أود طلب كبسة لحم من مطعم الريف"
          }
        ]
      }
    ]
  },
  {
    name: "مطعم الشام",
    categories: [
      {
        name: "مشاوي",
        items: [
          {
            name: "شيش طاووق",
            image: "https://via.placeholder.com/250x150?text=شيش+طاووق",
            whatsapp: "https://wa.me/96892345678?text=مرحباً، أود طلب شيش طاووق من مطعم الشام"
          }
        ]
      }
    ]
  }
];

function createMenuItem(item) {
  const itemDiv = document.createElement("div");
  itemDiv.className = "menu-item";

  const itemName = document.createElement("p");
  itemName.textContent = item.name;

  const itemImage = document.createElement("img");
  itemImage.src = item.image;
  itemImage.alt = item.name;

  const orderButton = document.createElement("button");
  orderButton.textContent = "اطلب عبر واتساب";
  orderButton.onclick = () => window.open(item.whatsapp, "_blank");

  itemDiv.appendChild(itemName);
  itemDiv.appendChild(itemImage);
  itemDiv.appendChild(orderButton);

  return itemDiv;
}

function createCategory(category) {
  const categoryDiv = document.createElement("div");
  categoryDiv.className = "category";

  const categoryTitle = document.createElement("h3");
  categoryTitle.textContent = category.name;
  categoryDiv.appendChild(categoryTitle);

  category.items.forEach(item => {
    const itemDiv = createMenuItem(item);
    categoryDiv.appendChild(itemDiv);
  });

  return categoryDiv;
}

function createRestaurant(restaurant) {
  const restaurantDiv = document.createElement("div");
  restaurantDiv.className = "restaurant";

  const restaurantTitle = document.createElement("h2");
  restaurantTitle.textContent = restaurant.name;
  restaurantDiv.appendChild(restaurantTitle);

  const menuDiv = document.createElement("div");
  menuDiv.className = "menu";

  restaurant.categories.forEach(category => {
    const categoryDiv = createCategory(category);
    menuDiv.appendChild(categoryDiv);
  });

  restaurantDiv.appendChild(menuDiv);
  return restaurantDiv;
}

function renderRestaurants() {
  const container = document.getElementById("restaurants-container");
  restaurants.forEach(restaurant => {
    const restaurantDiv = createRestaurant(restaurant);
    container.appendChild(restaurantDiv);
  });
}

document.addEventListener("DOMContentLoaded", renderRestaurants);