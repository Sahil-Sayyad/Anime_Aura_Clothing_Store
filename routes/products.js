//import requried packeges
const express = require("express");
const router = express.Router();
const passport = require('passport');
const productController = require("../controllers/product_Controller");

router.get("/show/:productId", productController.show);
router.get("/cart",passport.checkAuthentication, productController.cart);
router.post("/addtocart", passport.checkAuthentication, productController.addToCart);
router.get("/remove/:productId", passport.checkAuthentication, productController.removeFromCart);
router.post("/checkout", passport.checkAuthentication, productController.checkOut);
router.post("/order-placed", passport.checkAuthentication, productController.orderPlaced);



module.exports = router;
