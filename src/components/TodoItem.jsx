export function TodoItem({ completed, id, title, toggleTodo, deleteTodo, editTodo }) {
  
    return (
      <li>
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => toggleTodo(id, e.target.checked)}
          />
          {title}
          <button className="btn btn-success hover:bg-green-500 hover:bg-opacity-20 focus-visible:bg-green-500 focus-visible:bg-opacity-20" onClick={() => editTodo(id)}>
            Edit Item
          </button>
          <button className="btn btn-danger hover:bg-red-500 hover:bg-opacity-20 focus-visible:bg-red-500 focus-visible:bg-opacity-20" onClick={() => deleteTodo(id)}>
           Delete Item
          </button>
        </label>
      </li>
    );
   }
    