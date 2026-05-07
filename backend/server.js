const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb://tarunisanjana_db_user:iWGUIHp7RFojvm9p@ac-4adr9rh-shard-00-00.ro6juyz.mongodb.net:27017,ac-4adr9rh-shard-00-01.ro6juyz.mongodb.net:27017,ac-4adr9rh-shard-00-02.ro6juyz.mongodb.net:27017/todosdb?ssl=true&replicaSet=atlas-h5rinc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=serverless-todo"
)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const TodoSchema = new mongoose.Schema({
  text: String,
});

const Todo = mongoose.model("Todo", TodoSchema);

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });

  await todo.save();

  res.json(todo);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});