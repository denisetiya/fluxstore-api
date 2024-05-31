const express = require("express");
const response = require("../../utils/response.js");
const sortProductCategory = express();
const sortSubCategories = express();
const sortProducts = express();
const {
  getCategoryProducts,
  getSubCategoryProducts,
  getProducts,
} = require("../../repository/r-product.js");

sortProductCategory.get("/", async (req, res) => {
  try {
    const { id, nameCategory } = req.query;
    const categories = await getCategoryProducts({ id, nameCategory });

    if (!categories) {
      return response(404, "Category not found", res);
    }

    return response(200, "Success", res, categories);
  } catch (error) {
    return response(500, error.message, res);
  }
});

sortProductCategory.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const categories = await getCategoryProducts({ id });

    if (!categories) {
      return response(404, "Category not found", res);
    }

    return response(200, "Success", res, categories);
  } catch (error) {
    return response(500, error.message, res);
  }
});

sortSubCategories.get("/", async (req, res) => {
  try {
    const { id, nameSubCategory, categoryId } = req.query;
    const subCategories = await getSubCategoryProducts({
      id,
      nameSubCategory,
      categoryId,
    });

    if (!subCategories) {
      return response(404, "SubCategory not found", res);
    }

    return response(200, "Success", res, subCategories);
  } catch (error) {
    return response(500, error.message, res);
  }
});

sortSubCategories.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const subCategories = await getSubCategoryProducts({ id });

    if (!subCategories) {
      return response(404, "SubCategory not found", res);
    }

    return response(200, "Success", res, subCategories);
  } catch (error) {
    return response(500, error.message, res);
  }
});

sortProducts.get("/", async (req, res) => {
  try {
    const { name, gender, minDiscount, maxDiscount, minPrice, maxPrice } =
      req.query;
    const products = await getProducts({
      name,
      gender,
      minDiscount,
      maxDiscount,
      minPrice,
      maxPrice,
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

sortProducts.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProducts(id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = { sortProductCategory, sortSubCategories, sortProducts };
