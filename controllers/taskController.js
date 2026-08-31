const taskService = require("../services/taskService");

async function getAllTasks(request, response) {
  try {
    const tasks = await taskService.getAllTasks();

    response.status(200).json(tasks);
  } catch (error) {
    console.error("Get tasks error:", error.message);
    response.status(500).json({ message: "Failed to get tasks" });
  }
}

async function createTask(request, response) {
  try {
    const { title } = request.body;

    if (!title || !title.trim()) {
      return response.status(400).json({ message: "Title is required" });
    }

    const task = await taskService.createTask(title.trim());

    response.status(201).json(task);
  } catch (error) {
    console.error("Create task error:", error.message);
    response.status(500).json({ message: "Failed to create task" });
  }
}

async function updateTaskStatus(request, response) {
  try {
    const id = Number(request.params.id);
    const { isCompleted } = request.body;

    if (!Number.isInteger(id) || id <= 0) {
      return response.status(400).json({ message: "Valid task ID is required" });
    }

    if (typeof isCompleted !== "boolean") {
      return response.status(400).json({ message: "isCompleted must be true or false" });
    }

    const task = await taskService.updateTaskStatus(id, isCompleted);

    if (!task) {
      return response.status(404).json({ message: "Task not found" });
    }

    response.status(200).json(task);
  } catch (error) {
    console.error("Update task error:", error.message);
    response.status(500).json({ message: "Failed to update task" });
  }
}

async function deleteTask(request, response) {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return response.status(400).json({ message: "Valid task ID is required" });
    }

    const task = await taskService.deleteTask(id);

    if (!task) {
      return response.status(404).json({ message: "Task not found" });
    }

    response.status(200).json({
      message: "Task deleted successfully",
      task: task
    });
  } catch (error) {
    console.error("Delete task error:", error.message);
    response.status(500).json({ message: "Failed to delete task" });
  }
}

module.exports = {
  getAllTasks,
  createTask,
  updateTaskStatus,
  deleteTask
};