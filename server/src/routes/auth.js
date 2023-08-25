const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Token } = require("../models/index");

const { authenticateToken } = require("../middlewares/authentication");

const router = express.Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.sendStatus(401); // Unauthorized
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    await Token.create({ userId: user.id, token });
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    await Token.destroy({ where: { userId } });
    res.sendStatus(200); // OK
  } catch (error) {
    res.sendStatus(500); // Internal Server Error
  }
});

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email address already taken" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await User.create({ firstName, lastName, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
