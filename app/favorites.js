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
  const emptyMsg = document.querySelector(".empty-favorites-msg");

  closeFavorites.addEventListener("click", () => {
    favoritesModal.classList.remove("show-favorites");
  });

  if (localStorage.getItem("favoriteItems") === null) {
    localStorage.setItem("favoriteItems", JSON.stringify([]));
  }

  const renderFavorites = () => {
    favoriteItems = JSON.parse(localStorage.getItem("favoriteItems")) || [];
    favoritesOutput.innerHTML = "";
    favoriteItems.forEach((item, index) => {
      favoritesOutput.insertAdjacentHTML(
        "beforeend",
        favoriteTemplate(item, index)
      );
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

  /* remove an item from favorites regardless of the count */
  favoritesOutput.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-favorite")) {
      let indexClass = Array.from(e.target.parentElement.classList).find(
        (cls) => cls.startsWith("item-")
      );
      console.log(indexClass);

      // takes fx "item-0" and returns 0... parseInt takes a string and returns a number, the value 10 is the radix, which is the base of the numeral system
      let index = parseInt(indexClass.split("-")[1], 10);

      // Remove the item from the array
      favoriteItems.splice(index, 1);

      if (favoriteItems.length === 0) {
        emptyMsg.insertAdjacentHTML(beforeend, "No items in favorites");
      } else {
        emptyMsg.innerHTML = "";
      }

      // Update localStorage and the favorites
      localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
      renderFavorites();
    }
  });

  // _______________________________________________________________

  /* ↓ remove and item with a count key value on the items like in cart (unnecessary for favorites) ↓ */

  /*   favoritesOutput.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-favorite")) {
      let indexClass = Array.from(e.target.parentElement.classList).find(
        (cls) => cls.startsWith("item-")
      );
      console.log(indexClass);

      let index = parseInt(indexClass.split("-")[1], 10);

      let item = favoriteItems[index];

      // Check if item is not undefined
      if (item) {
        item.count--;

        // If the count is 0, remove the item from the array
        if (item.count === 0) {
          favoriteItems.splice(index, 1);
        }

        // Update localStorage and the favorites
        localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
        renderFavorites();
        console.log(item.count);
      } else {
        console.log(`No item found at index ${index}`);
      }
    }
  }); */
};
