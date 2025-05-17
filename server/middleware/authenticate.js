const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "ilovecoding$123";

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token received:", token); // Debug: Check if token is received correctly

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", decoded); // Debug: Check if the token is decoded correctly
    req.user = decoded; // Attaching user data to the request object
    next();
  } catch (err) {
    console.error("JWT Error:", err); // Debug: Log the error to see the issue
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authenticate;
