const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const JWT_SECRET = process.env.JWT_SECRET || "ilovecoding$123";

// Create a new user (register)
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body); // Password will be hashed in schema

    // Generate JWT
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, username: newUser.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Exclude password before sending response
    const { password: _, ...userWithoutPassword } = newUser._doc;

    res.status(201).json({
      message: "User created",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password.trim());
    if (!isMatch) {
      console.log("DEBUG: Password mismatch");
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const { password: _, ...userWithoutPassword } = user._doc;

    return res.status(200).json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
};

// Fetch logged-in user's profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

// Update profile (except password)
exports.updateUserProfile = async (req, res) => {
  try {
    const updates = req.body;

    if (updates.password) {
      return res
        .status(400)
        .json({ message: "Password update not allowed here." });
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update profile", error: error.message });
  }
};

// Delete user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Both current and new passwords are required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword; // Will be hashed via pre-save hook
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Server error" });
  }
};
