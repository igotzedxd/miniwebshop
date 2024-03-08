export const productTemplate = (item) => {
  return `
    <div class="product">
      <h2>${item.name}</h2>
      <p>${item.price}</p>
    </div>
  `;
};
