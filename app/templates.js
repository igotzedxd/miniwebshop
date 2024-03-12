export const productTemplate = (item, index) => {
  return `
    <div class="product item-${index}">
    <img class="item-img" src="${item.images[0]}" alt="${item.title}">
      <p class="price">${item.price} ,- Dkk</p>
      <a class="add-cart" href="#">Add to Cart</a>
      <i class="fa-regular fa-star favorite"></i>
      </div>
  `;
};

export const cartTemplate = (item, index) => {
  return `
    <div class="cart-item item-${index}">
      <img class="item-cart-img" src="${item.images[0]}" alt="${item.title}">
      <p class="price">${item.price} ,- Dkk</p>
      <p class="count">Quantity: ${item.count}</p>
      <a class="remove-cart" href="#">Remove from Cart</a>
    </div>
  `;
};

export const favoriteTemplate = (item, index) => {
  return `
    <div class="favorite-item item-${index}">
      <img class="item-favorite-img" src="${item.images[0]}" alt="${item.title}">
      <p class="price">${item.price} ,- Dkk</p>
            <p class="item-count">Quantity: ${item.count}</p>

      <a class="remove-favorite" href="#">Remove from Favorites</a>
    </div>
  `;
};
