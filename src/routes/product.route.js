const express = require("express");
const {
  getProducts,
  createProduct,
  getProductById,
  updateProductById,
  getProductsByCategory,
} = require("../controller/product.controller");
const uploader = require("../lib/multer");
const router = express.Router();

router.get("/", getProducts);
router.get("/category-product/:id", getProductsByCategory);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.put("/:id", updateProductById);

module.exports = router;
