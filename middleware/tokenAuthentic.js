const jwt = require("jsonwebtoken");

const User = require("../model/userModel");

require("dotenv").config();

module.exports.authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    let verifyToken = await jwt.verify(token, process.env.SECRETKEY);

    if (!verifyToken) return res.status(400).json({ message: "invalid Token" });
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal Error", err: error });
  }
};
