//render sign-In page
const Admin = require('../models/admin');
const { generateRefreshToken } = require('../config/refreshToken');
const { generateToken } = require('../config/jwtToken');
module.exports.create = async (req, res) => {
  try {

    const admins = [{
      email: "igsahilsayyad@gmail.com",
      password: "1234"
    },
    {
      email: "sahilsayyad@gmail.com",
      password: "1234"
    }
    ]
    const admin = await Admin.create(admins);
    return res.redirect('/admin/sign-in');
  } catch (err) {
    console.log(err);
    return;
  }
}
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
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    const token = generateToken(admin?._id);

    req.flash("success", "Logged in Successfully");
    return res.redirect("/admin/sign-in");
  } catch (err) {
    console.log(`Error in createsession controller ${err}`);
    return;
  }
};
