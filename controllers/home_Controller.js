const Product = require("../models/product");
const Cart = require("../models/cart");
const User = require("../models/user");
const Address = require("../models/address");

//Rendering home page
module.exports.home = async (req, res) => {
  try {
    const products = await Product.find({});

    if (products) {
      return res.render("home", {
        title: "Anime Aura",
        products,
      });
    }
    return res.redirect("/");
  } catch (err) {
    console.log(`error in home controller ${err}`);
    return;
  }
};

//Rendering About page.
module.exports.about = async (req, res) => {
  try {
    return res.render("about", {
      title: "Anime Aura | About",
    });
  } catch (err) {
    console.log(`error in home controller ${err}`);
    return;
  }
};

//Rendering Profile page.
module.exports.profile = async (req, res) => {
  try {
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
    return res.render("profile", {
      title: "Anime Aura | Profile",
      cartinfo,
      shippingFee,
      subTotal,
      noShow,
      addressinfo,
      length,
    });
  } catch (err) {
    console.log(`error in home controller ${err}`);
    return;
  }
};

//Rendering Women page.
module.exports.women = async (req, res) => {
  try {
    const products = await Product.find({});

    return res.render("women", {
      title: "Anime Aura",
      products,
    });
  } catch (err) {
    console.log(`error in home controller ${err}`);
    return;
  }
};
