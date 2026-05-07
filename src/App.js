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

  return (
    <div className="app">
      <h1>To-Do App</h1>

      <input
  value={text}
  onChange={(e) => setText(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  }}
  placeholder="Enter todo"
/>

      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;