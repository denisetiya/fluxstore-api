const { updateProduct } = require("../../repository/r-product.js");

const updateProductService = async (id, data) => {

  const result = await updateProduct(id, data);

  if (!result) {

    throw new Error("Failed to update product");

  }

  return result;

}

module.exports = updateProductService