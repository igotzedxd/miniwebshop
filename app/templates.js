export const productTemplate = (item, index) => {
  return `
    <div class="product item-${index}">
    <img class="item-img" src="${item.images[0]}" alt="${item.title}">
      <p class="price">${item.price} ,- Dkk</p>
      <a class="add-cart" href="product.html?id=${index}">Add to Cart</a>
      <i class="fa-regular fa-star favorite"></i>
      </div>
  `;
};
