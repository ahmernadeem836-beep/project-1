const taskList = document.getElementById("taskList");
const message = document.getElementById("message");
const taskTitleInput = document.getElementById("taskTitle");
const addTaskForm = document.getElementById("addTaskForm");

function showMessage(text) {
  message.textContent = text;
}

async function updateTaskStatus(id, isCompleted) {
  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isCompleted: isCompleted })
    });

    const data = await response.json();

    if (!response.ok) {
      showMessage(data.message);
      return;
    }

    await loadTasks();
  } catch (error) {
    showMessage("Task update nahi ho saki. Server check karo.");
  }
}

async function deleteTask(id) {
  const shouldDelete = window.confirm("Kya aap is task ko delete karna chahte hain?");

  if (!shouldDelete) {
    return;
  }

  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE"
    });

    const data = await response.json();

    if (!response.ok) {
      showMessage(data.message);
      return;
    }

    await loadTasks();
  } catch (error) {
    showMessage("Task delete nahi ho saki. Server check karo.");
  }
}

function createTaskElement(task) {
  const listItem = document.createElement("li");
  const taskLeft = document.createElement("div");
  const checkbox = document.createElement("input");
  const taskText = document.createElement("span");
  const deleteButton = document.createElement("button");

  listItem.className = "task-item";
  taskLeft.className = "task-left";
  checkbox.className = "task-checkbox";
  taskText.className = "task-title";
  deleteButton.className = "delete-button";

  checkbox.type = "checkbox";
  checkbox.checked = task.isCompleted;
  taskText.textContent = task.title;
  deleteButton.textContent = "Delete";

  if (task.isCompleted) {
    taskText.classList.add("completed");
  }

  checkbox.addEventListener("change", async function () {
    await updateTaskStatus(task.id, checkbox.checked);
  });

  deleteButton.addEventListener("click", async function () {
    await deleteTask(task.id);
  });

  taskLeft.appendChild(checkbox);
  taskLeft.appendChild(taskText);
  listItem.appendChild(taskLeft);
  listItem.appendChild(deleteButton);

  return listItem;
}

async function loadTasks() {
  try {
    const response = await fetch("/api/tasks");
    const tasks = await response.json();

    taskList.innerHTML = "";
    showMessage("");

    if (!response.ok) {
      showMessage("Tasks load nahi ho saki.");
      return;
    }

    if (tasks.length === 0) {
      const emptyItem = document.createElement("li");

      emptyItem.className = "empty-state";
      emptyItem.textContent = "No tasks yet. Add your first task.";
      taskList.appendChild(emptyItem);
      return;
    }

    for (const task of tasks) {
      taskList.appendChild(createTaskElement(task));
    }
  } catch (error) {
    showMessage("Tasks load nahi ho saki. Server check karo.");
  }
}

addTaskForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const title = taskTitleInput.value.trim();

  if (!title) {
    showMessage("Please enter a task title.");
    return;
  }

  try {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title })
    });

    const data = await response.json();

    if (!response.ok) {
      showMessage(data.message);
      return;
    }

    taskTitleInput.value = "";
    await loadTasks();
  } catch (error) {
    showMessage("Task add nahi ho saki. Server check karo.");
  }
});

loadTasks();