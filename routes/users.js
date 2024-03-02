//import requried packeges
const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/user_Controller");

router.get("/sign-up", userController.signUp);
router.get("/sign-in", userController.signIn);
router.post("/create", userController.create);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "back" ,failureFlash:" Dont' have an account? Sign Up" }),
  userController.createSession
);
router.get("/sign-out", userController.destroySession);
module.exports = router;
