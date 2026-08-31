const express = require("express");
const { connectToDatabase } = require("./config/database");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));
app.use("/api/tasks", taskRoutes);

app.get("/", function (request, response) {
  response.status(200).json({ message: "To-Do API is running" });
});

connectToDatabase()
  .then(function () {
    app.listen(PORT, function () {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(function (error) {
    console.error("Database connection failed:", error.message);
  });