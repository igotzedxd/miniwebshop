import { renderData } from "./renderProducts.js";
import { renderCart } from "./openCart.js";
const app = {};

app.init = () => {
  renderData();
  renderCart();
};

app.init();
