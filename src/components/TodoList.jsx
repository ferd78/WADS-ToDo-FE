import { TodoItem } from "./TodoItem";

export function TodoList({ todos, toggleTodo, deleteTodo, editTodo }) {
    return (
        <div>
            <h1 className="header"> To-Do List: </h1>
            <ul className="list">
                {todos.length === 0 && "No todos currently!"}
                {todos.map((todo, id) => {
                return (
                    <TodoItem
                    {...todo}
                    key={todo.id}
                    toggleTodo={toggleTodo}
                    editTodo={editTodo}
                    deleteTodo={deleteTodo}
                    />
                );
                })}
            </ul>
        </div>
    );
}
