import data from "./fetchData.js";
import { productView } from "./templates.js";

const displayProduct = async () => {
  // Parse the URL parameters to get the product index
  const urlParams = new URLSearchParams(window.location.search);
  const itemIndex = Number(urlParams.get("item")); // Convert itemIndex to a number
  console.log(itemIndex); // Log itemIndex to the console

  // Fetch the product data
  const shirtData = await data.fetchData();
  const items = shirtData.products;
  console.log(items); // Log items to the console

  // Get the product details using the index
  const item = items[itemIndex];
  console.log(item); // Log product to the console
  const output = document.querySelector(".single-product-view");
  // Check if product is not undefined
  if (item) {
    // Display the product details on the page
    output.insertAdjacentHTML("beforeend", productView(item, itemIndex));
  } else {
    console.error(`No product found at index ${itemIndex}`);
  }
};

displayProduct();

/* import data from "./fetchData.js";

const displayProduct = async () => {
  // Parse the URL parameters to get the product index
  const urlParams = new URLSearchParams(window.location.search);
  const itemIndex = Number(urlParams.get("item")); // Convert itemIndex to a number
  console.log(itemIndex); // Log itemIndex to the console

  // Fetch the product data
  const shirtData = await data.fetchData();
  const items = shirtData.products;
  console.log(items); // Log items to the console

  // Get the product details using the index
  const product = items[itemIndex];
  console.log(product); // Log product to the console

  // Check if product is not undefined
  if (product) {
    // Display the product details on the page
    document.querySelector(".single-product-view").insertAdjacentHTML(
      "beforeend",
      `
      <h1>${product.title}</h1>
      <img src="${product.images[0]}" alt="${product.title}">
      <p>${product.price} ,- Dkk</p>
    `
    );
  } else {
    console.error(`No product found at index ${itemIndex}`);
  }
};

displayProduct(); */
