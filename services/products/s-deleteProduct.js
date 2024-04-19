const { deleteProduct, deleteDetailProduct } = require("../../repository/r-product");

const deleteProductService = async (id) => {

  const result = await deleteProduct(id);

  if (!result) {
    
    throw new Error("Failed to delete product");

  }

  return result;

}

const deleteDetailProductService = async (id) => {

  const result = await deleteDetailProduct(id);

  if (!result) {
    
    throw new Error("Failed to delete detail product");

  }

  return result;

}

module.exports = {
  deleteProductService,
  deleteDetailProductService
}