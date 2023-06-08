const express = require("express");
const { signUp, loginUser } = require("../controller/user.controller");
const router = express.Router();

router.post("/", signUp);
router.post("/", loginUser);

module.exports = router;
