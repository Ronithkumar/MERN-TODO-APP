const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authenticate = require("./middleware/authenticate");
require("dotenv").config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Public routes
app.use("/Users", require("./routes/userRoutes"));

// Protected routes
app.use("/Tasks", authenticate, require("./routes/taskRoutes"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
