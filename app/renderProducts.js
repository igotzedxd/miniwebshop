import data from "./fetchData.js";
import { productTemplate } from "./templates.js";

export const renderData = async () => {
  const shirtData = await data.fetchData();
  const items = shirtData.products;
  const output = document.querySelector(".products");
  items.forEach((item) => {
    output.insertAdjacentHTML("beforeend", productTemplate(item));
  });

  if (localStorage.getItem("cartItems") === null) {
    localStorage.setItem("cartItems", JSON.stringify([]));
  }
  let cartItems = JSON.parse(localStorage.getItem("cartItems"));

  const addToCart = document.querySelectorAll(".add-cart");
  addToCart.forEach((button, index) => {
    button.addEventListener("click", () => {
      let itemId = items[index].id;
      let itemInCart = cartItems.find((item) => item.id === itemId);
      if (itemInCart) {
        itemInCart.count += 1;
      } else {
        cartItems.push({ ...items[index], count: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    });
  });
};
