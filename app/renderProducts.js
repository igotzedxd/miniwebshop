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
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        let itemId = items[index].id;
        let itemInCart = cartItems.find((item) => item.id === itemId);
        if (itemInCart) {
          itemInCart.count += 1;
        } else {
          cartItems.push({ ...items[index], count: 1 });
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        if (!cartOpen.classList.contains("show")) {
          console.log("show class is not present");
          cartNoti.classList.add("show-cart-noti");
        } else {
          cartNoti.classList.remove("show-cart-noti");
        }
        renderCartFunc.updateCart();
        renderCartFunc.renderItems();
        if (itemInCart) {
          console.log(itemInCart.count);
        } else {
          console.log("Item not found in cart");
        }
      });
    });
  };
  addToCartFunc();

  return {
    addToCartFunc,
  };
};
