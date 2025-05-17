const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const taskController = require("../controllers/taskController");

router.post("/", authenticate, taskController.createTask);
router.get("/", authenticate, taskController.getTask);
router.get("/:id", authenticate, taskController.getTaskById);
router.put("/:id", authenticate, taskController.updateTaskById);
router.delete("/:id", authenticate, taskController.deleteTaskById);

module.exports = router;
