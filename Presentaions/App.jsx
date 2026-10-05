// React demo: Vite + React  (npm create vite@latest demo -- --template react)
// Replace src/App.jsx with this file and import the shared CSS.
import { useState } from "react";
import "./shared.css";

export default function App() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const addTodo = () => {
    const title = text.trim();
    if (!title) return;
    setTodos([...todos, { id: Date.now(), title, done: false }]);
    setText("");
  };

  const toggle = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const remove = (id) => setTodos(todos.filter((t) => t.id !== id));

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <main className="app">
      <h1>React demo</h1>

      <section className="card">
        <h2>Counter</h2>
        <div className="counter">
          <button className="ghost" onClick={() => setCount(count - 1)}>−</button>
          <output>{count}</output>
          <button onClick={() => setCount(count + 1)}>+</button>
        </div>
      </section>

      <section className="card">
        <h2>To-do list</h2>
        <div className="add">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="What needs doing?"
          />
          <button onClick={addTodo}>Add</button>
        </div>

        {todos.length === 0 ? (
          <p className="empty">Nothing here yet. Add your first task.</p>
        ) : (
          <ul>
            {todos.map((t) => (
              <li key={t.id} className={t.done ? "done" : ""}>
                <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
                <span>{t.title}</span>
                <button className="ghost" onClick={() => remove(t.id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
        <p className="summary">{remaining} of {todos.length} tasks left</p>
      </section>
    </main>
  );
}
