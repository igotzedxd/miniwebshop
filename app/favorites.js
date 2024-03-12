import data from "./fetchData.js";
import { favoriteTemplate } from "./templates.js";

let favoriteItems = JSON.parse(localStorage.getItem("favoriteItems")) || [];

export const renderFavoritesModal = async () => {
  const shirtData = await data.fetchData();
  const items = shirtData.products;
  const favoritesModal = document.querySelector(".favorites");
  const closeFavorites = document.querySelector(".close-favorites");
  const openFavorites = document.querySelector(".open-favorites");
  const favoritesOutput = document.querySelector(".favorites-output");

  closeFavorites.addEventListener("click", () => {
    favoritesModal.classList.remove("show-favorites");
  });

  if (localStorage.getItem("favoriteItems") === null) {
    localStorage.setItem("favoriteItems", JSON.stringify([]));
  }

  let favoriteItems = JSON.parse(localStorage.getItem("favoriteItems")) || [];

  const renderFavorites = () => {
    favoriteItems = JSON.parse(localStorage.getItem("favoriteItems")) || [];
    favoriteItems.forEach((item) => {
      favoritesOutput.innerHTML = "";
      favoritesOutput.insertAdjacentHTML("beforeend", favoriteTemplate(item));
    });
  };

  renderFavorites();
  const addToFavorites = document.querySelectorAll(".favorite");
  addToFavorites.forEach((button, index) => {
    button.addEventListener("click", () => {
      let itemId = items[index].id;
      let itemInFavorites = favoriteItems.find((item) => item.id === itemId);
      if (itemInFavorites) {
        itemInFavorites.count += 1;
        console.log(itemInFavorites.count);
      } else {
        favoriteItems.push({ ...items[index], count: 1 });
      }
      localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
      renderFavorites();
    });
  });

  openFavorites.addEventListener("click", () => {
    favoriteItems = JSON.parse(localStorage.getItem("favoriteItems")) || [];
    favoritesModal.classList.add("show-favorites");
  });

  favoritesOutput.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-favorite")) {
      let index = e.target.parentElement.classList[1].split("-")[1];
      let item = favoriteItems[index];

      // Check if item is not undefined
      if (item) {
        item.count--;

        // If the count is 0, remove the item from the array
        if (item.count === 0) {
          favoriteItems.splice(index, 1);
        }

        // Update localStorage and the cart
        localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
        renderFavorites();
        console.log(item.count);
      } else {
        console.log(`No item found at index ${index}`);
      }
    }
  });
};
