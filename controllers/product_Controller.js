const Product = require("../models/product");
const Cart = require("../models/cart");
const User = require("../models/user");
const Address = require("../models/address");
const Order = require("../models/order");
module.exports.cart = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      let noShow = false;
      return res.render("cart", {
        title: "Anime Aura | Cart",
        noShow,
      });
    }

    let user = await User.findById(req.user._id)
      .populate("cart")
      .populate({
        path: "cart",
        populate: {
          path: "product",
          module: "Product",
        },
      })
      .populate("address");
    let address = await Address.find({});
    let length = 0;
    let addressinfo;
    if (address) {
      addressinfo = user.address;
      if (addressinfo) {
        length = Object.keys(addressinfo).length;
      }
    }

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
    let noShow = true;
    return res.render("cart", {
      title: "Anime Aura | Cart",
      cartinfo,
      shippingFee,
      subTotal,
      noShow,
      addressinfo,
      length,
    });
  } catch (err) {
    console.log(`error in cart controller ${err}`);
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
    console.log(`error in show controller ${err}`);
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

module.exports.addAddress = async (req, res) => {
  try {
    return res.render("address", {
      title: "Anime Aura | Add Address",
    });
  } catch (err) {
    console.log(`error in add address controller ${err}`);
    return;
  }
};

module.exports.saveAddress = async (req, res) => {
  try {
    const { apartment, state, city, country, pincode, phone } = req.body;
    const address = await Address.create({
      apartment,
      city,
      state,
      country,
      pincode,
      phone,
      user: req.user._id,
    });
    await User.findByIdAndUpdate(
      req.user._id,
      {
        address: address,
      },
      {
        new: true,
      }
    );
    req.flash("success", "Address saved Successfully");
    return res.redirect("/product/cart");
  } catch (err) {
    console.log(`error in save address  controller ${err}`);

    return;
  }
};

module.exports.orderPlaced = async (req, res) => {
  try {
    return res.render("order_placed", {
      title: "Anime Aura | Order Placed",
    });
  } catch (err) {
    console.log(`error in order placed controller ${err}`);

    return;
  }
};


module.exports.orderHistory = async (req, res) => {
  try {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let currentdate = year + "-" + month + "-" + date;
    let user = await User.findById(req.user._id)
      .populate("cart")
      .populate({
        path: "cart",
        populate: {
          path: "product",
          module: "Product",
        },
      })
      .populate("address");
    let address = await Address.find({});
    let addressinfo;
    if (address) {
      addressinfo = user.address;
    }

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
    subTotal = subTotal + shippingFee;
    const order = await Order.create({
      customername: user.name,
      totalAmount: subTotal,
      orderdate: currentdate,
      user: req.user._id,
    });

    for (let item of cartinfo) {
      // console.log("Quantity : ", item.quantity);

      // order.billing.quantity = item.quantity;
      order.billing.push({
        quantity: item.quantity,
        product: item.product._id
      });
    }

    user.cart = [];

    user.order.push(order);
    await order.save();
    await user.save();
    await Cart.deleteMany({});
    return res.redirect("/profile");
  } catch (err) {
    console.log(err);
    return;
  }
};
