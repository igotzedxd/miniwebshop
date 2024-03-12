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
      <form class="choose-amount" method = "get">
      <a class="minus minus-${index}" href="#">-</a>
      <input class="input-amount item-${index}" type="number" name="num" min="1" max="20" value="${item.count}"><br>
      <a class="plus plus-${index}" href="#">+</a>
      </form>
    </div>
  `;
};

export const favoriteTemplate = (item, index) => {
  return `
    <div class="favorite-item item-${index}">
      <img class="item-favorite-img" src="${item.images[0]}" alt="${item.title}">
      <p class="price">${item.price} ,- Dkk</p>
      <a class="remove-favorite" href="#">Remove from Favorites</a>
    </div>
  `;
};
