//import requried packeges
const express = require("express");
const router = express.Router();
const passport = require('passport');
const productController = require("../controllers/product_Controller");

router.get("/show/:productId", productController.show);
router.get("/cart", productController.cart);
router.post("/addtocart", passport.checkAuthentication, productController.addToCart);
router.get("/remove/:productId", passport.checkAuthentication, productController.removeFromCart);
router.get("/add-address", passport.checkAuthentication, productController.addAddress);
router.post("/save-address", passport.checkAuthentication, productController.saveAddress);
router.get("/order-placed", passport.checkAuthentication, productController.orderPlaced);
router.get('/order-history', passport.checkAuthentication, productController.orderHistory);

module.exports = router;
