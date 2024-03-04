//this middleware for auntheticate admin.
const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {

  let cookie = req.cookies;
  if (!cookie) {
    req.flash("error", "Admin is not authorized or token is missing ");
    
    return res.redirect('/admin/sign-in');
  }
  let token = cookie.refreshToken;


  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      req.flash("error", "Admin is not authorized or token is missing ");
      return res.redirect('/admin/sign-in');
    }

    req.user = decoded.user;
    next();
  });

};

module.exports = validateToken;