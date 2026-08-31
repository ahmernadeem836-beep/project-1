const { sql } = require("../config/database");

async function getAllTasks() {
  const result = await sql.query(
    "SELECT id, title, isCompleted FROM tasks"
  );

  return result.recordset;
}

async function createTask(title) {
  const request = new sql.Request();

  request.input("title", sql.NVarChar(255), title);

  const result = await request.query(
    "INSERT INTO tasks (title) OUTPUT INSERTED.id, INSERTED.title, INSERTED.isCompleted VALUES (@title)"
  );

  return result.recordset[0];
}

async function updateTaskStatus(id, isCompleted) {
  const request = new sql.Request();

  request.input("id", sql.Int, id);
  request.input("isCompleted", sql.Bit, isCompleted);

  const result = await request.query(
    "UPDATE tasks SET isCompleted = @isCompleted OUTPUT INSERTED.id, INSERTED.title, INSERTED.isCompleted WHERE id = @id"
  );

  return result.recordset[0];
}

async function deleteTask(id) {
  const request = new sql.Request();

  request.input("id", sql.Int, id);

  const result = await request.query(
    "DELETE FROM tasks OUTPUT DELETED.id, DELETED.title, DELETED.isCompleted WHERE id = @id"
  );

  return result.recordset[0];
}

module.exports = {
  getAllTasks,
  createTask,
  updateTaskStatus,
  deleteTask
};