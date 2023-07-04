const express = require("express");
const router = express.Router();
const {
  handleRegistration,
  handleLogin,
} = require("../controllers/auth-controller");
router.post("/register", handleRegistration);
router.post("/login", handleLogin);
module.exports = router;
