import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // Fetch todos
  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  // Add todo
  const addTodo = async () => {
    if (!text) return;

    const res = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const newTodo = await res.json();

    setTodos([...todos, newTodo]);
    setText("");
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    });

    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const toggleComplete = async (id) => {

  const res = await fetch(`http://localhost:5000/todos/${id}`, {
    method: "PUT",
  });

  const updatedTodo = await res.json();

  setTodos(
    todos.map((todo) =>
      todo._id === id ? updatedTodo : todo
    )
  );
};

  return (
    <div className="app">
      <h1>To-Do App</h1>

      <div className="input-container">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
          placeholder="Enter a task"
        />

        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li className="todo-item" key={todo._id}>

  <div className="todo-left">

    <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => toggleComplete(todo._id)}
    />

    <span
      className={
        todo.completed ? "completed" : ""
      }
    >
      {todo.text}
    </span>

  </div>

  <button
    className="delete-btn"
    onClick={() => deleteTodo(todo._id)}
  >
    Delete
  </button>

</li>
        ))}
      </ul>
    </div>
  );
}

export default App;