const Task = require("../models/taskModel");

exports.createTask = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(200).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTask = async (req, res) => {
  try {
    const getTask = await Task.find();
    res.status(200).json(getTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const getTask = await Task.findById(req.params.id);
    if (!getTask) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(getTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTaskById = async (req, res) => {
  try {
    const updateTask = await Task.findByIdAndUpdate(
      req.params.id,
      { task: req.body.task, completed: req.body.completed },
      { new: true }
    );
    if (!updateTask) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(updateTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTaskById = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    if (!deleteTask) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
