const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const JWT_SECRET = config.get("sec");

router.post("/createUser", async (req, res) => {
  console.log(JWT_SECRET);
  try {
    let { email, name, password } = req.body;
    console.log(email);
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 1 });
    }
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(password, salt);
    user = await User.create({
      name: name,
      password: secPassword,
      email: email,
    });
    const data = {
      user: {
        id: user.id,
      },
    };

    success = true;
    const authToken = jwt.sign(data, JWT_SECRET);
    const userData = await User.findById(user.id)
      .select("-password")
      .select("-_id")
      .select("-userType");

    res.json({ success, authToken, ...userData.toObject() });
  } catch (err) {
    success = false;
    console.error(err.message);
    res.status(400).json({ success, error: "Internal error occured" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .json({  error: "Please enter correct credentials!" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res.status(401).json({
        error: "Please try to login with correct credentials",
      });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    // res.json(user) //sending user as response
    const userData = await User.findById(user.id)
      .select("-password")
      .select("-_id");

    res.json({ authToken, ...userData.toObject() });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: "Internal error occured" });
  }
});

module.exports = router;
