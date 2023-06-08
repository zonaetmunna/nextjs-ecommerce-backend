const express = require("express");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category.controller");
const uploader = require("../lib/multer");

const router = express.Router();

router.get("/", getCategories);
router.post("/", uploader.array("image", 4), createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
