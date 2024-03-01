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
      res.status(400);
      throw new Error("Admin is not authorized");
    }

    req.user = decoded.user;
    next();
  });

  if (!token) {
    res.status(401);
    throw new Error("Admin is not authorized or token is missing ");
  }

};

module.exports = validateToken;