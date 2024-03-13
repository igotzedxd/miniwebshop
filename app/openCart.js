import { cartTemplate } from "./templates.js";

export const renderCart = async () => {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let cart = document.querySelector(".cart");
  let viewCart = document.querySelector(".view-cart");
  const cartOpen = document.querySelector(".cart-open");
  const emptyCart = document.querySelector(".empty-cart");
  const totalPrice = document.querySelector(".cart-total");

  // Create a new cart element and replace the old one with it
  let newCart = cart.cloneNode(true);
  cart.parentNode.replaceChild(newCart, cart);
  cart = newCart;

  // Do the same for viewCart
  let newViewCart = viewCart.cloneNode(true);
  viewCart.parentNode.replaceChild(newViewCart, viewCart);
  viewCart = newViewCart;

  const openCart = () => {
    const cartNoti = document.querySelector("#cart-noti");

    cartOpen.classList.toggle("show");
    cartNoti.classList.remove("show-cart-noti");
    console.log(
      "cartNoti classList after removing show-cart-noti:",
      cartNoti.classList
    );
  };

  cart.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("Cart clicked");
    openCart();
  });

  const renderItems = () => {
    viewCart.innerHTML = "";
    cartItems.forEach((item, index) => {
      viewCart.insertAdjacentHTML("beforeend", cartTemplate(item, index));
    });

    let total = cartItems.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
    if (cartItems.length > 0) {
      totalPrice.innerHTML = "";
      totalPrice.insertAdjacentHTML(
        "beforeend",
        `<p>Total: ${total} ,- Dkk</p>`
      );
    } else {
      while (totalPrice.firstChild) {
        totalPrice.removeChild(totalPrice.firstChild);
      }
      totalPrice.insertAdjacentHTML("beforeend", `<p>Total: 0 ,- Dkk</p>`);
    }
  };

  const updateCart = () => {
    cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    console.log("added or removed an item");

    // Sort the cartItems array based on the id property of the items
    cartItems.sort((a, b) => a.id - b.id);

    renderItems();
  };

  if (cartItems.length === 0) {
    emptyCart.insertAdjacentHTML("beforeend", "<p>Cart is empty</p>");
  } else {
    emptyCart.innerHTML = "";
    renderItems();
  }

  /* removes item when clicking remove item in cart */
  viewCart.addEventListener("click", (e) => {
    // Ignore clicks on input fields
    if (e.target.tagName === "INPUT") {
      return;
    }

    if (e.target.classList[1]) {
      let index = e.target.classList[1].split("-")[1];
      let item = cartItems[index];

      if (e.target.classList.contains("plus")) {
        // Increase the count of the item
        item.count++;
      } else if (e.target.classList.contains("minus")) {
        // Decrease the count of the item
        item.count--;

        // If the count is 0, remove the item from the array
        if (item.count === 0) {
          cartItems.splice(index, 1);
        }
      }

      // Update localStorage and the cart
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCart();
      console.log(item.count);
    }
  });

  viewCart.addEventListener("input", (e) => {
    let index = e.target.classList[1].split("-")[1];
    console.log("Index:", index);
    let item = cartItems[index];

    // Update the count of the item based on the new value of the input field
    item.count = parseInt(e.target.value);
    console.log("New count:", item.count);

    // If the count is 0, remove the item from the array
    if (item.count === 0) {
      cartItems.splice(index, 1);
    }

    // Update localStorage and the cart
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCart();
    console.log(item.count);
  });

  return {
    updateCart,
    renderItems,
    openCart,
  };
};
