const express = require("express");
const router = express.Router();

const { createUser } = require("../controllers/user.controller");

router.post("/createuser", createUser);

module.exports = router;
