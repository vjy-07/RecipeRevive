// backend/controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Handle user signup
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  // Required fields validation
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // Name validation
  if (name.trim().length < 3) {
    return res.status(400).json({
      message: "Name must be at least 3 characters",
    });
  }

  const nameRegex = /^[A-Za-z ]+$/;

  if (!nameRegex.test(name)) {
    return res.status(400).json({
      message: "Name can contain only letters and spaces",
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Please enter a valid email address",
    });
  }

  // Password validation
  if (password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters",
    });
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must contain uppercase, lowercase, number and special character",
    });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    user = new User({
      name,
      email,
      password,
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to the database
    await user.save();

    // Generate a token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Handle user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Required fields validation
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Please enter a valid email address",
    });
  }
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = { signup, loginUser };
