const express = require("express");
const router = express.Router();

const { createUser, userSignIn, userLogout } = require("../controllers/user.controller");

router.post("/createuser", createUser);
router.post("/userlogin", userSignIn);
router.post("/logout", userLogout);

module.exports = router;
