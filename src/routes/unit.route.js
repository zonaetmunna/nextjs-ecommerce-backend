const express = require("express");
const { getUnits, createUnit } = require("../controller/unit.controller");
const router = express.Router();

router.get("/", getUnits);
router.post("/", createUnit);

module.exports = router;
