const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // checking token existence and validity

  if (token) {
    jwt.verify(token, "mso 1478 9632", (err, decodedToken) => {
      if (err) {
        res.status(401).redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(401).redirect("/login");
  }
};

// check current user

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "mso 1478 9632", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;

        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = {
  requireAuth,
  checkUser,
};
