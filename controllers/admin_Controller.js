const Admin = require('../models/admin');
const Product = require('../models/product')
const { generateRefreshToken } = require('../config/refreshToken');
const { generateToken } = require('../config/jwtToken');

module.exports.create = async (req, res) => {
  try {
    const admins = [{
      email: "igsahilsayyad@gmail.com",
      password: "1234"
    },
    {
      email: "rushabtak@gmail.com",
      password: "1234"
    },
    {
      email: "rohitbhalekar@gmail.com",
      password: "1234"
    }
    ]
    await Admin.create(admins);
    return res.redirect('/admin/sign-in');
  } catch (err) {
    console.log(err);
    return;
  }
}

//render sign-In page
module.exports.signIn = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("admin_sign_in", {
    title: "Anime Aura | Admin Sign In",
  });
};

//sign in and create session for the user
module.exports.createSession = async function (req, res) {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (admin.email != email || admin.password != password) {

      req.flash("error", "Invalid username or password");
      return res.redirect('/admin/sign-in');

    }

    const refreshToken = await generateRefreshToken(admin?._id);
    await Admin.findByIdAndUpdate(
      admin.id,
      {
        refreshToken: refreshToken

      },
      {
        new: true
      });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    generateToken(admin?._id);
    req.flash("success", "Logged in Successfully");
    return res.redirect("/admin/dashboard");
  } catch (err) {
    console.log(`Error in createsession controller ${err}`);
    return;
  }
};

module.exports.dashBoard = async (req, res) => {
  try {
    return res.render("admin_panel", {
      title: "Anime Aura | Dashboard",
    });
  } catch (err) {
    console.log(err);
    return;
  }
};
module.exports.product = async (req, res) => {
  try {

    const products = await Product.find({});
    if(products){
      return res.render("admin_product", {
        title: "Anime Aura | Admin Product",
        products:products
      });
    }
    return res.render("admin_product", {
      title: "Anime Aura | Admin Product",
    });

  } catch (err) {
    console.log(err);
    return;
  }
};
module.exports.createProduct = async (req, res) => {
  try {
    const {
       title,
       category,
       price,
    } = req.body;
    let path = req.file.path;
    let newPath = path.replace('public','');
    const product = await Product.create({
      title,
      category,
      price,
      image:newPath
    })
    req.flash("success", "Product Added Successfully");
    return res.redirect('/admin/product');
  } catch (err) {
    console.log(err);
    return;
  }
};