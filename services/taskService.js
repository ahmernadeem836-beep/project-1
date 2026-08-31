const taskRepository = require("../repositories/taskRepository");

async function getAllTasks() {
  return taskRepository.getAllTasks();
}

async function createTask(title) {
  return taskRepository.createTask(title);
}

async function updateTaskStatus(id, isCompleted) {
  return taskRepository.updateTaskStatus(id, isCompleted);
}

async function deleteTask(id) {
  return taskRepository.deleteTask(id);
}

module.exports = {
  getAllTasks,
  createTask,
  updateTaskStatus,
  deleteTask
};