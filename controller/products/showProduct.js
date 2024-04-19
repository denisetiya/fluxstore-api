const showProductService = require("../../services/products/s-showProduct.js");
const express = require("express");
const response = require("../../utils/response.js");
const showProduct = express();

showProduct.get("/", async (req, res) => {

  try {
    
    const result = await showProductService();

    if(!result) {

      throw new Error("Failed get products");

    }

    response(200, "Success get products", res, result);

  } catch (error) {
    
    return response(400, error.message, res);

  }

})

showProduct.get("/:id", async (req, res) => {

  const {id} = req.params;

  try {

    const result = await showProductService(id);

    if(!result) {

      throw new Error("Failed get product");

    }

    response(200, "Success get product", res, result);

  } catch (error) {

    return response(400, error.message, res);

  }
})

module.exports = showProduct