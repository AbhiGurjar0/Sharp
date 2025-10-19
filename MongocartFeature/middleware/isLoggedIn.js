const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login");
  }
  try {
    // console.log(token)
    const decoded = jwt.verify(token, "1234");
    req.user = decoded;

    next();
  } catch (err) {
    return res.redirect("/login");
  }
};

module.exports = auth;
