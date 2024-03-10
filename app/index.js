import { renderData } from "./renderProducts.js";
const app = {};

app.init = () => {
  renderData();
  let storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
  console.log("Stored in localstorage:", storedCartItems);
};

app.init();
