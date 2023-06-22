const express = require("express");
const uploader = require("../lib/multer");
const {
  getBrands,
  createBrand,
  updateBrands,
  deleteBrands,
} = require("../controller/brand.controller");

const router = express.Router();

router.get("/", getBrands);
router.post("/", uploader.array("image", 4), createBrand);
router.put("/:id", updateBrands);
router.delete("/:id", deleteBrands);

module.exports = router;
