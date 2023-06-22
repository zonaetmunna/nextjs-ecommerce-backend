const express = require("express");
const router = express.Router();

router.use("/products", require("./product.route"));
router.use("/categories", require("./category.route"));
router.use("/brands", require("./brand.route"));
router.use("/units", require("./unit.route"));
router.use("/auth", require("./user.route"));

module.exports = router;
