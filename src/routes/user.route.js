const express = require("express");
const { signUp, loginUser } = require("../controller/user.controller");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", loginUser);

module.exports = router;
