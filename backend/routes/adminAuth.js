// routes/adminAuth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

// const { Admin } = require("../models");
const Admin = require("../models/Admin");

// REGISTER (create admin)
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing = await Admin.findOne({ where: { email } });
    if (existing) return res.status(400).json({ msg: "Admin already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      email,
      password: hashed
    });

    res.json({ msg: "Admin created", admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, admin: { id: admin.id, email: admin.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;