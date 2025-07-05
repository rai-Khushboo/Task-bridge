import { useState } from "react";
import { Check, Circle } from "lucide-react";
import "./App.css";

export default function App() {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);

  const addTodoItem = () => {
    if (input.trim() === "") return;
    const item = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };
    setTodoList((prev) => [...prev, item]);
    setInput("");
  };

  const toggleCompleted = (id) => {
    setTodoList(
      todoList.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            completed: !t.completed,
          };
        } else {
          return t;
        }
      })
    );
  };

  const deleteTodo = (id) => {
    setTodoList(todoList.filter((t) => t.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodoItem();
    }
  };

  const completedCount = todoList.filter(t => t.completed).length;
  const totalCount = todoList.length;

  return (
    <div className="app-wrapper">
      <div className="app-container">
        {/* Header */}
        <div className="app-header">
          <h1 className="app-title">
            ✨ Todo Magic
          </h1>
          <p className="app-subtitle">
            Transform your day, one task at a time
          </p>
        </div>

        {/* Main Card */}
        <div className="main-card">
          {/* Stats */}
          {totalCount > 0 && (
            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-number total">{totalCount}</div>
                <div className="stat-label">Total</div>
              </div>
              <div className="stat-item">
                <div className="stat-number done">{completedCount}</div>
                <div className="stat-label">Done</div>
              </div>
              <div className="stat-item">
                <div className="stat-number left">{totalCount - completedCount}</div>
                <div className="stat-label">Left</div>
              </div>
            </div>
          )}

          {/* Input Section */}
          <div className="input-container">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="todo-input-enhanced"
            />
            <button
              onClick={addTodoItem}
              className="add-button-enhanced"
            >
              ➕
            </button>
          </div>

          {/* Todo List */}
          <div className="todo-list-enhanced">
            {todoList.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <p className="empty-title">No tasks yet!</p>
                <p className="empty-subtitle">Add your first todo above</p>
              </div>
            ) : (
              todoList.map((todo) => (
                <div
                  key={todo.id}
                  className={`todo-item-enhanced ${todo.completed ? 'completed' : ''}`}
                >
                  <button
                    onClick={() => toggleCompleted(todo.id)}
                    className={`checkbox-enhanced ${todo.completed ? 'checked' : ''}`}
                  >
                    {todo.completed ? (
                      <Check size={10} className="check-icon" />
                    ) : (
                      <Circle size={10} className="circle-icon" />
                    )}
                  </button>
                  
                  <span className={`todo-text-enhanced ${todo.completed ? 'completed-text' : ''}`} style={{textAlign: 'center', width: '100%'}}>
                    {todo.text}
                  </span>
                  
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="delete-button-enhanced"
                  >
                    🧹
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Progress Bar */}
          {totalCount > 0 && (
            <div className="progress-container">
              <div className="progress-header">
                <span className="progress-label">Progress</span>
                <span className="progress-percentage">{Math.round((completedCount / totalCount) * 100)}%</span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="app-footer">
          <p className="footer-text">
            Press Enter to add • Click circle to complete • Hover to delete
          </p>
        </div>
      </div>
    </div>
  );
}