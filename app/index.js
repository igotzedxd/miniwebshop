import { renderData } from "./renderProducts.js";
import { renderFavoritesModal } from "./favorites.js";

const app = {};

app.init = () => {
  renderData();
  renderFavoritesModal();
};

app.init();
