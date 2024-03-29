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
  console.log("items:", items);
  const output = document.querySelector(".products");
  const cartNoti = document.querySelector("#cart-noti");
  const cartOpen = document.querySelector(".cart-open");
  const singleOutput = document.querySelector(".single-product-view");

  if (output) {
    items.forEach((item, index) => {
      output.insertAdjacentHTML("beforeend", productTemplate(item, index));
    });
  }

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
        console.log(cartItems);

        let itemIndex = 0;
        let urlParams;
        console.log("item-index:", itemIndex);
        if (singleOutput) {
          urlParams = new URLSearchParams(window.location.search);
          itemIndex = Number(urlParams.get("item"));
          console.log("item-index:", itemIndex);
        } else {
          itemIndex = index;
        }

        let itemId = items[itemIndex].id;
        let itemInCart = cartItems.find((item) => item.id === itemId);
        console.log("itemInCart:", itemInCart);
        if (itemInCart) {
          itemInCart.count += 1;
        } else {
          cartItems.push({ ...items[itemIndex], count: 1 });
        }

        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        if (!cartOpen.classList.contains("show")) {
          console.log("show class is not present");
          cartNoti.classList.add("show-cart-noti");
        } else {
          cartNoti.classList.remove("show-cart-noti");
        }
        renderCartFunc.updateCart();
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
