const express = require("express");
const response = require("../../utils/response.js");
const { deleteProductService, deleteDetailProductService} = require("../../services/products/s-deleteProduct.js");
const deleteProductRoute = express();
const deleteProductDetailRoute = express();

deleteProductRoute.delete("/:id", async (req, res) => {
  
  const {id} = req.params;

  try {

    const result = await deleteProductService(id);

    if(!result) {
      
      throw new Error("Failed to delete product");

    }

    return response(200, "Success delete product", res, result);

  } catch (error) {
    
    return response(400, error.message, res);

  }
    
})

deleteProductDetailRoute.delete("/:id", async (req, res) => {
  
  const {id} = req.params;

  try {
    
    const result = await deleteDetailProductService(id);

    if(!result) {
      
      throw new Error("Failed to delete detail product");

    }

    return response(200, "Success delete detail product", res, result);

  } catch (error) {
    
    return response(400, error.message, res);

  }
})

module.exports = {
  deleteProductRoute,
  deleteProductDetailRoute
}