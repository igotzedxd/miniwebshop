import data from "./fetchData.js";
import { productTemplate } from "./templates.js";

export const renderData = async () => {
  const phoneData = await data.fetchData();
  const items = phoneData.products;
  console.log(items);
  const output = document.querySelector(".output");
  items.forEach((item) => {
    output.insertAdjacentHTML("beforeend", productTemplate(item));
  });
};
