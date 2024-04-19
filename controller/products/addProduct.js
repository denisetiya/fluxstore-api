const express = require("express");
const response = require("@utils/response");
const addProductService = require("@service/products/s-addProduct");
const addProduct = express();


addProduct.post("/", async (req, res) => {

  const data = req.body;

  try {

    const result = await addProductService(data);

    if (!result) {

      throw new Error("Failed to add product");
    }

    return response(200, "Success add product", res, result);

  } catch (error) {

    return response(400, error.message, res);

  }

})

module.exports = addProduct