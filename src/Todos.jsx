
import { useState } from 'react';
import styles from './Todos.module.css';

const Todos = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);
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
  const updatedTodos = [...todos];
  const movedItem = updatedTodos.splice(index, 1)[0];
  movedItem.completed = true;
  setTodos(updatedTodos);
  setCompleted([...completed, movedItem]);
};

  const handleEdit = (index) => {
    setNewTodo(todos[index].text); 
    setEditIndex(index); 
  };
  
  function handleDeleted(index) {
  const updatedTodos = [...todos];
  updatedTodos.splice(index, 1);
  setTodos(updatedTodos);
}
const handleDeleteCompleted = (index) => {
  const updated = [...completed];
  updated.splice(index, 1);
  setCompleted(updated);
};

const moveBackSection = (index) => {
  const updatedCompleted = [...completed];
  const movedItem = updatedCompleted.splice(index, 1)[0];
  movedItem.completed = false;
  setCompleted(updatedCompleted);
  setTodos([...todos, movedItem]);
};
  return (
    <div style={{border:"2px solid green",width:"50%",background:"green", color:"white",marginLeft:"25%" , marginTop:"5rem"}}>
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
        className={styles.inputBackColor}
          type="text"
          placeholder="Add new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button  className={styles.hover} style={{marginLeft:"1rem",backgroundColor:"white", color:"red"}} type="submit">{editIndex === null ? "Add Todo" : "Update Todo"}</button>
      </form>

      <ul className={styles.listbox}>
        {
        todos.map((todo, index) => (
          <li key={index}
          className={styles.list}
          >
            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
              {todo.text}
            </span>
            <button  className={styles.hover} style={{marginLeft:"1rem",backgroundColor:"yellow", color:"black"}} onClick={() => handleToggle(index)}>
                            {todo.completed ? "Undo" : "Complete"}
            </button>
            <button  className={styles.hover} style={{marginLeft:"1rem",backgroundColor:"blue", color:"white"}} onClick={() => handleEdit(index) }>Update</button>
              <button className={styles.hover} style={{marginLeft:"1rem",backgroundColor:"red", color:"white"}} onClick={() => handleDeleted(index)}>deleted</button>
          </li>
        ))
        }
      </ul>
      <ul className={styles.listbox}>
          {
        completed.map((complete, index) => (
          <li key={index}
          className={styles.list} >
             <span>
              {complete.text}
            </span>
            <button 
    className={styles.hover}
    style={{ marginLeft:"1rem", backgroundColor:"red", color:"white" }}
    onClick={() => handleDeleteCompleted(index)}
  >
    Delete
  </button>
     <button 
    className={styles.hover}
    style={{ marginLeft:"1rem", backgroundColor:"green", color:"white" }}
    onClick={() => moveBackSection(index)}
  >
    moveBack
  </button>
          </li>
        ))
        }
      </ul>
    </div>
  );
};

export default Todos;
