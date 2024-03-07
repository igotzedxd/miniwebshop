const data = {};

data.fetchData = async () => {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=shirt`
    );
    const phoneData = await response.json();
    /*     console.log(phoneData);
     */ return phoneData;
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
};

export default data;
