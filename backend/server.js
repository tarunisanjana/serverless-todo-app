const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());



mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const TodoSchema = new mongoose.Schema({
  text: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

// GET TODOS
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// ADD TODO
app.post("/todos", async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });

  await todo.save();

  res.json(todo);
});

// DELETE TODO
app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);

  res.json({
    message: "Todo deleted",
  });
});

app.put("/todos/:id", async (req, res) => {

  const todo = await Todo.findById(req.params.id);

  todo.completed = !todo.completed;

  await todo.save();

  res.json(todo);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});