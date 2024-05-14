// import "../App.css";
// import { useState } from "react";
// import { TodoForm } from "../components/TodoForm";
// import { TodoList } from "../components/TodoList";
// import axios from "axios";


// function Todo() {
//     const [todos, setTodos] = useState([]);
//     const [filter, setFilter] = useState('all');

// function addTodo(title) {
//     setTodos((currentTodos) => {
//      return [
//         ...currentTodos,
//      { id: crypto.randomUUID(), title, completed: false },
//     ];
//  });
// }

// function toggleTodo(id, completed) {
//     setTodos((currentTodos) => {
//      return currentTodos.map((todo) => {
//        if (todo.id === id) {
//         return { ...todo, completed };
//        }

//        return todo;
//      });
//    });
// }

// function editTodo(id, Title){
//   const NewTitle = prompt("Edit your current title: ", Title)
//   if(NewTitle !== null) {
//     setTodos((currentTodos) => {
//       const updatedTodo = currentTodos.map((todo) => {
//         if(todo.id === id){
//           return {...todo, title: NewTitle};
//         }
//         return todo;

//       });
//       return updatedTodo;
//     });

//   }
// }


// function handleFilterState(event) {
//     setFilter(event.target.value);
// }
    
// function filterTodos() {
//     if(filter == "completed") {
//           return todos.filter((todo) => todo.completed);
//     }

//     else if(filter == "uncompleted") {
//           return todos.filter((todo) => !todo.completed);
//     }

//     else {
//           return todos;
//     }

// }



// function deleteTodo(id) {
//     setTodos((currentTodos) => {
//         return currentTodos.filter((todo) => todo.id !== id);
//     });
//  }
 
//  return (
//   <>
//     <TodoForm addTodo={addTodo} />
//     <div>
//       <br></br>
//         <label htmlFor="filter" className="font-mono font-semibold"> Filter: </label>
//         <br></br>
//         <select id="filter" value={filter} onChange={handleFilterState} className="font-mono font-semibold text-black rounded">
//             <option value="all" className="font-mono font-semibold">All</option>
//             <option value="completed" className="font-mono font-semibold">Completed</option>
//             <option value="uncompleted" className="font-mono font-semibold">Uncompleted</option>
//         </select>
//     </div>
//     <TodoList todos={filterTodos()} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} />
//   </>
//   );
// }

// export default Todo;

import "../App.css";
import { useEffect, useState } from "react";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";

import axios from "axios";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // --- FETCH ---
  useEffect(() => {
    axios
      .get("http://localhost:8000/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log("There was an error retrieving the todo list: ", error);
      });
  }, []);

  // --- ADD ---
  function addTodo(title) {
    const newTodo = {
      id: crypto.randomUUID(), // Generate a UUID for the new todo item
      title,
      completed: false,
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);

    axios.post("http://localhost:8000/todos/new", newTodo).catch((error) => {
      console.error("There was an error adding the todo: ", error);
    });
  }

  function toggleTodo(id, completed) {
    axios
      .put(`http://localhost:8000/todos/edit/${id}`, { completed })
      .then(() => {
        setTodos((currentTodos) =>
          currentTodos.map((todo) => {
            if (todo.id === id) {
              return { ...todo, completed };
            }
            return todo;
          })
        );
      })
      .catch((error) => {
        console.error("There was an error updating the todo: ", error.response);
      });
  }

  function editTodo(id, Title){
    // const NewTitle = prompt("Edit your current title: ", Title)
    // if(NewTitle !== null) {
    //   setTodos((currentTodos) => {
    //     const updatedTodo = currentTodos.map((todo) => {
    //       if(todo.id === id){
    //         return {...todo, title: NewTitle};
    //       }
    //       return todo;

    //     });
    //     return updatedTodo;
    //   });

    // }
    axios
      .put(`http://localhost:8000/todos/edit/${id}`, { completed })
      .then(() => {
        setTodos((currentTodos) =>
          currentTodos.map((todo) => {
            if (todo.id === id) {
              return { ...todo, completed };
            }
            return todo;
          })
        );
      })
      .catch((error) => {
        console.error("There was an error updating the todo: ", error.response);
      });
  }

  function handleFilterState(event) {
      setFilter(event.target.value);
  }
      
  function filterTodos() {
      if(filter == "completed") {
            return todos.filter((todo) => todo.completed);
      }

      else if(filter == "uncompleted") {
            return todos.filter((todo) => !todo.completed);
      }

      else {
            return todos;
      }

  }

  function deleteTodo(id) {
    axios
      .delete(`http://localhost:8000/todos/delete/${id}`)
      .then(() => {
        setTodos((currentTodos) =>
          currentTodos.filter((todo) => todo.id !== id)
        );
      })
      .catch((error) => {
        console.error("There was an error deleting the todo: ", error);
      });
  }

  return (
    <>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}

export default Todo;