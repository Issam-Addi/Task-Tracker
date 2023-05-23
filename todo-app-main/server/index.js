const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const app = express();
app.use(express.json());
app.use(cors());

// Create a new task schema and model using Mongoose
const taskSchema = new mongoose.Schema({
  id: String,
  name: String,
  completed: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

// Fetch all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new task
app.post("/tasks", async (req, res) => {
  const newTaskData = req.body;

  try {
    const newTask = new Task(newTaskData);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    await Task.deleteOne({ id: taskId });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const start = async () => {
  await mongoose.connect("mongodb+srv://mufidalnadi996:PJBTnlQBEPGDFN3w@cluster0.2nrymlo.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });
};

start();
