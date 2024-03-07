import data from "./fetchData.js";

export const renderData = async () => {
  const phoneData = await data.fetchData();
  const output = document.querySelector(".output");
  phoneData.forEach((phone) => {
    output.innerHTML = `${phone.title} ${phone.price} ${phone.color} ${phone.company} ${phone.info}`;
  });
};
