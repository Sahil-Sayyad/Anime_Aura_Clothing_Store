//import requried packeges
const express = require("express");
const router = express.Router();
const upload = require('../middleware/multer');
const validateToken = require('../middleware/validateAdmin')
const adminController = require("../controllers/admin_Controller");

router.get("/sign-in", adminController.signIn);
router.get("/create", adminController.create);
router.post("/create-sessionAdmin",adminController.createSessionAdmin);
router.get("/destroy-sessionAdmin",adminController.destroySessionAdmin);
router.get("/dashboard", validateToken, adminController.dashBoard);
router.get("/product", validateToken, adminController.product);
router.post("/create-product", validateToken, upload.single("image") , adminController.createProduct);

module.exports = router;
