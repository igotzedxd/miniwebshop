import { cartTemplate } from "./templates.js";

export const renderCart = async () => {
  const cart = document.querySelector(".cart");
  const viewCart = document.querySelector(".view-cart");
  const cartOpen = document.querySelector(".cart-open");
  const emptyCart = document.querySelector(".empty-cart");
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  if (cartItems.length === 0) {
    emptyCart.insertAdjacentHTML("beforeend", "<p>Cart is empty</p>");
  } else {
    emptyCart.innerHTML = "";
  }

  cart.addEventListener("click", (e) => {
    cartOpen.classList.toggle("show");
    viewCart.innerHTML = "";
    cartItems.forEach((item, index) => {
      viewCart.insertAdjacentHTML("afterbegin", cartTemplate(item, index));
    });
  });

  /* removes item when clicking remove item in cart */
  viewCart.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-cart")) {
      let index = e.target.parentElement.classList[1].split("-")[1];
      cartItems.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      e.target.parentElement.remove();
      if (cartItems.length === 0) {
        emptyCart.insertAdjacentHTML("beforeend", "<p>Cart is empty</p>");
      } else {
        emptyCart.innerHTML = "";
      }
    }
  });
};
