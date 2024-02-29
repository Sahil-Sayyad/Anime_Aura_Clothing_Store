//import requried packeges
const express = require("express");
const router = express.Router();
const passport = require("passport");

const adminController = require("../controllers/admin_Controller");

router.get("/sign-in", adminController.signIn);
router.get("/create", adminController.create);

router.post("/create-session",adminController.createSession);
module.exports = router;
