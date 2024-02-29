//import requried packeges
const express = require("express");
const router = express.Router();
// const passport = require("passport");

const productController = require("../controllers/product_Controller");

router.get("/cart", productController.cart);
router.get("/show", productController.show);


module.exports = router;
