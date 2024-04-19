const { createProduct } = require("@repository/r-product");

const addProductService = async (data) => {

  
  const result = await createProduct(data);

  if (!result) {

    throw new Error("Failed to add product");

  }

  return result;


}

module.exports = addProductService