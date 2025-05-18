const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const userController = require("../controllers/userController");

router.post("/", userController.createUser);
router.post("/login", userController.loginUser);

router.get("/profile", authenticate, userController.getUserProfile);
router.put("/profile", authenticate, userController.updateUserProfile);
router.post(
  "/profile/change-password",
  authenticate,
  userController.changePassword
);
router.delete("/:id", userController.deleteUserById);

module.exports = router;
