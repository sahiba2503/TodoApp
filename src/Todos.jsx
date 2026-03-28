
import { useState } from 'react';

const Todos = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTodo.trim() === "") return; 

    if (editIndex === null) {
     
      setTodos([...todos, { text: newTodo, completed: false }]);
    } else {
     
      const updatedTodos = [...todos];
      updatedTodos[editIndex].text = newTodo;
      setTodos(updatedTodos);
      setEditIndex(null); 
    }

    setNewTodo("");
  };

  const handleToggle = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleEdit = (index) => {
    setNewTodo(todos[index].text); 
    setEditIndex(index); 
  };

  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">{editIndex === null ? "Add Todo" : "Update Todo"}</button>
      </form>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
              {todo.text}
            </span>
            <button onClick={() => handleToggle(index)}>
              {todo.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => handleEdit(index)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
