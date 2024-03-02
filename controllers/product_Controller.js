const Product = require("../models/product");
const Cart = require("../models/cart");
const User = require("../models/user");

module.exports.cart = async (req, res) => {
  try {
      let user = await User.findById(req.user._id)
      .populate("cart")
      .populate({
        path: "cart",
        populate: {
          path: "product",
          module: "Product",
        },
      });
    const cartinfo = user.cart;
    let subTotal = 0;
    cartinfo.forEach((item) => {
      let price = parseFloat(item.product.price);
      let quantity = parseFloat(item.quantity);
      if (!isNaN(price) && !isNaN(quantity)) {
        subTotal = subTotal + price * quantity;
      }
    });
    let shippingFee = 100;
    if (subTotal === 0) {
      shippingFee = 0;
    }
    return res.render("cart", {
      title: "Anime Aura | Cart",
      cartinfo,
      shippingFee,
      subTotal,
    });
  
  return res.render("cart",{
    title: "Anime Aura | Cart",
  });
  } catch (err) {
    console.log(`error in product controller ${err}`);
    return;
  }
};
module.exports.show = async (req, res) => {
  try {
    const id = req.params.productId;
    let productId = id.replace("productId=", "");
    const product = await Product.findById(productId);
    return res.render("product", {
      title: "Anime Aura | Product",
      product: product,
    });
  } catch (err) {
    console.log(`error in product controller ${err}`);
    return;
  }
};
module.exports.addToCart = async (req, res) => {
  try {
    const { quantity, id } = req.body;
    let user = await User.findById(req.user._id);
    if (user) {
      const cart = await Cart.create({
        quantity,
        product: id,
        user: req.user._id,
      });
      //add product to user
      user.cart.push(cart);
      user.save();
    }
    req.flash("success", "Added to Cart Successfully");
    return res.redirect("back");
  } catch (err) {
    console.log(`error in add to cart controller ${err}`);
    return;
  }
};

module.exports.removeFromCart = async (req, res) => {
  try {
    const id = req.params.productId;
    const item = await Cart.findByIdAndDelete(id);
    let user = await User.findById(req.user._id);
    if (user) {
      //delete product from users cart array.
      user.cart.pop(item);
      user.save();
    }
    req.flash("success", "Removed Successfully");
    return res.redirect("back");
  } catch (err) {
    console.log(`error in remove from  cart controller ${err}`);
    return;
  }
};


module.exports.checkOut = async (req, res) => {
  try {
    return res.render("checkout", {
      title: "Anime Aura | Checkout",
    });
  } catch (err) {
    console.log(`error in add to checkout controller ${err}`);
    return;
  }
};
