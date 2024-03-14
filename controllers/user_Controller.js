//import requried packeges
const User = require("../models/user");
const brcypt = require("bcrypt");
var validator = require("email-validator");

//render sign-up page
module.exports.signUp = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("sign_up", {
    title: "Anime Aura | Sign Up",
  });
};

//render sign-In page
module.exports.signIn = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("sign_in", {
    title: "Anime Aura | Sign In",
  });
};

//get the sign up data and create new user in db
module.exports.create = async (req, res) => {
  try {
    //check if the passeword and confrim password is correct
    if (req.body.password != req.body.confirmPassword) {
      req.flash('error', 'Please Enter Correct Confirm Password');
      console.log("Password not matched");
      return res.redirect("/user/sign-up");
    }
     if(!validator.validate(req.body.email)){
       req.flash("error","Please enter correct email");
       return res.redirect('back');
    };
    //check if the user already exists
    let user = await User.findOne({ email: req.body.email });

    //insert the new user if the user is not exist
    if (!user) {
      user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
      });

      //hash the password before saving into database
      const salt = await brcypt.genSalt(10);
      user.password = await brcypt.hash(user.password, salt);
      await user.save();
      req.flash('success', 'Sign Up Successfully Now Login');
      return res.redirect("/user/sign-in");
    } else {
      req.flash('success', 'Email Already Exist Please Login');
      console.log(`user already exist`);
      return res.redirect("/user/sign-in");
    }
  } catch (err) {
    console.log(`error in signup controller of user ${err}`);
    return;
  }
};

//sign in and create session for the user
module.exports.createSession = async function (req, res) {
  try {
    req.flash("success", "Logged in Successfully");
    return res.redirect("/");
  } catch (err) {
    console.log(`Error in createsession controller ${err}`);
    return;
  }
};

//sign out and destory session of the user
module.exports.destroySession = function (req, res) {
  req.flash("success", "Logged out Successfully");
  req.logout((err) => {
    if (err) {
      return done(err);
    }
  });
  return res.redirect("/");
};
