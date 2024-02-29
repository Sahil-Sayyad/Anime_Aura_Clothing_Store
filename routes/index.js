//import requried packeges
const express = require("express");
const router = express.Router();
const passport = require("passport");

//home controller for home page
const homeController = require("../controllers/home_Controller");

router.get("/", homeController.home);
router.get("/about", homeController.about);
// router.get("/profile", passport.checkAuthentication, homeController.profile);
router.use("/user", require("./users"));
router.use("/product", require("./products"))
router.use("/admin", require("./admin"))



module.exports = router;
