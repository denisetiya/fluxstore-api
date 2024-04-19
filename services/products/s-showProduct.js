const { getAllProduct, getProductById } = require("../../repository/r-product.js")

const showProductService = async (id) => {

  if (id) {

    const result = await getProductById(id);
    
    if (!result) {

      throw new Error("Product not found");
    
    }

    return result;

  }

  const result = await getAllProduct();

  if (!result) {

    throw new Error("Failed to get products");

  }
  
  else if (result.length === 0) {
  
    throw new Error("Products not found");

  }

  return result;

}

module.exports = showProductService
