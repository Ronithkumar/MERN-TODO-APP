const mongoose = require("mongoose");

const TasksSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    task: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Tasks = mongoose.model("tasks", TasksSchema);

module.exports = Tasks;
