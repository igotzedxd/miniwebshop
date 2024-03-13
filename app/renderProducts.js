import data from "./fetchData.js";
import { productTemplate } from "./templates.js";
import { renderCart } from "./openCart.js";

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

let renderCartFunc;

renderCart().then((result) => {
  console.log("Result of renderCart:", result);
  renderCartFunc = result;
});

export const renderData = async () => {
  const shirtData = await data.fetchData();
  const items = shirtData.products;
  const output = document.querySelector(".products");
  const cartNoti = document.querySelector("#cart-noti");
  const cartOpen = document.querySelector(".cart-open");

  items.forEach((item, index) => {
    output.insertAdjacentHTML("beforeend", productTemplate(item, index));
  });

  if (localStorage.getItem("cartItems") === null) {
    localStorage.setItem("cartItems", JSON.stringify([]));
  }
  const addToCartFunc = () => {
    const addToCart = document.querySelectorAll(".add-cart");
    addToCart.forEach((button, index) => {
      button.addEventListener("click", () => {
        cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        let itemId = items[index].id;
        let itemInCart = cartItems.find((item) => item.id === itemId);
        if (itemInCart) {
          itemInCart.count += 1;
        } else {
          cartItems.push({ ...items[index], count: 1 });
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        renderCartFunc.updateCart();
        renderCartFunc.renderItems();
        if (itemInCart) {
          console.log(itemInCart.count);
        } else {
          console.log("Item not found in cart");
        }
        if (cartOpen.classList.contains("show")) {
          cartNoti.classList.remove("show-cart-noti");
        } else {
          cartNoti.classList.add("show-cart-noti");
        }
      });
    });
  };
  addToCartFunc();

  return {
    addToCartFunc,
  };
};
