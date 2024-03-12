import { cartTemplate } from "./templates.js";

export const renderCart = async () => {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cart = document.querySelector(".cart");
  const viewCart = document.querySelector(".view-cart");
  const cartOpen = document.querySelector(".cart-open");
  const emptyCart = document.querySelector(".empty-cart");

  const renderItems = () => {
    viewCart.innerHTML = "";
    cartItems.forEach((item, index) => {
      viewCart.insertAdjacentHTML("afterbegin", cartTemplate(item, index));
    });
  };

  const updateCart = () => {
    cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    console.log("added or removed an item");
    renderItems();
  };

  const openCart = () => {
    console.log("Cart clicked");
    cartOpen.classList.toggle("show");
  };

  if (cartItems.length === 0) {
    emptyCart.insertAdjacentHTML("beforeend", "<p>Cart is empty</p>");
  } else {
    emptyCart.innerHTML = "";
    renderItems();
  }

  cart.addEventListener("click", openCart);

  /* removes item when clicking remove item in cart */
  viewCart.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-cart")) {
      let index = e.target.parentElement.classList[1].split("-")[1];
      cartItems.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCart();
    }
  });

  return {
    updateCart,
    renderItems,
  };
};
