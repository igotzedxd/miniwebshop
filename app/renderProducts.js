import data from "./fetchData.js";

export const renderData = async () => {
  const phoneData = await data.fetchData();
  const items = phoneData.products;
  console.log(items);
  const output = document.querySelector(".output");
  items.forEach((item) => {
    output.innerHTML += `<br>${item.title}<br> ${item.price}<br> ${item.description}<br><br>
    <img src="${item.images[0]}" alt="${item.title}" width="200" height="200">`;
  });
};
