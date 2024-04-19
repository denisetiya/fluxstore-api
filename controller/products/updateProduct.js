const express = require("express");
const response = require("../../utils/response.js");
const updateProductService = require("../../services/products/s-updateProduct.js");
const updateProduct = express();


updateProduct.put("/:id", async (req, res) => {

  const {id} = req.params;
  const data = req.body;

  try {
    
    const result = await updateProductService(id, data);

    if(!result) {
      
      throw new Error("Failed to update product");

    }

    response(200, "Success update product", res, result);

  } catch (error) {
    
    return response(400, error.message, res);

  }

})

module.exports = updateProduct
