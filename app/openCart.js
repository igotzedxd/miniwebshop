import { cartTemplate } from "./templates.js";

export const renderCart = async () => {
  const cartData = await data.fetchData();

  console.log(items);
  const cart = document.querySelector(".view-cart");
  items.forEach((item) => {
    output.insertAdjacentHTML("beforeend", cartTemplate(item));
  });
};
