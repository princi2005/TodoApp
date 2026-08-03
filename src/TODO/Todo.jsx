
import Chart from "./Chart";
import { useEffect, useState } from "react";

const Todo = () => {
  const [date, setDate] = useState("");
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  const getDate = () => {
    const dt = new Date();

    setDate({
      date: dt.getDate(),
      month: dt.toLocaleDateString("en-IN", {
        month: "long",
      }),
      weekday: dt.toLocaleDateString("en-IN", {
        weekday: "long",
      }),
    });
  };

  useEffect(() => {
    getDate();
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const addTodo = () => {
    if (input.trim() === "") return;

    const data = {
      id: crypto.randomUUID(),
      text: input,
      completed: false,
    };

    setTodos([...todos, data]);
    setInput("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id) => {
    setEditId(id);
  };

  const handleUpdate = (e, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: e.target.value } : todo
      )
    );
  };

  const handleSave = () => {
    setEditId(null);
  };

  const checkTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // Chart ke liye
  const total = todos.length;
  const completedTask = todos.filter(
    (todo) => todo.completed
  ).length;

  return (
    <div className="container">
      <div className="header">
        <div className="date-time">
          {date.date}, {date.month}
          <div>{date.weekday}</div>
        </div>

        <div className="todo-status">
          <Chart
            total={total}
            completedTask={completedTask}
          />
        </div>
      </div>

      <div className="todo-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter your todo..."
            value={input}
            onChange={handleInput}
          />

          <button onClick={addTodo}>Add</button>
        </div>

        <div>
          {todos.map((curItem) => (
            <div className="todos" key={curItem.id}>
              <input
                type="checkbox"
                className="check-btn"
                checked={curItem.completed}
                onChange={() => checkTodo(curItem.id)}
              />

              {curItem.id === editId ? (
                <input
                  type="text"
                  value={curItem.text}
                  onChange={(e) =>
                    handleUpdate(e, curItem.id)
                  }
                />
              ) : (
                <div>{curItem.text}</div>
              )}

              <div className="btns">
                {curItem.id === editId ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <button
                    onClick={() => handleEdit(curItem.id)}
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => deleteTodo(curItem.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
