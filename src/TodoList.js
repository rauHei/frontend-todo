import React from 'react';
import Todo from './Todo';


function TodoList({ todos, setTodos, filtered }) {
    console.log(filtered);
    return (

        <div>
            <ul className="todo-list2">
                {todos.map(todo => (
                    <Todo
                        todos={todos}
                        todo={todo}
                        setTodos={setTodos}
                        key={todo.id}
                        name={todo.name}
                        content={todo.content}
                        begin={todo.begin}
                        end={todo.end}

                    />
                )

                )}
            </ul>
        </div>




    );

}
export default TodoList;

