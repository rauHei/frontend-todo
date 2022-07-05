import React from "react";
import TodoService from './services/todos';

const Todo = ({
    name,
    todo,
    content,
    begin,
    end,
    setTodos,
    todos,
}) => {

    const deleteHandler = (e) => {
        let one = todos.filter((one) => one.id === todo.id)
        let theone = one.map(o => o.id)
        console.log('DELETED', theone)
        TodoService
            .deleteTodo(theone)
            .then(res =>
                console.log("deleted"))
        setTodos(todos.filter((el) => el.id !== todo.id))
    }

    const completeHandler = (e) => {
        let upone = todos.filter((a) => a.id === todo.id)
        let updateone = upone.map(u => u.id)

        let today = new Date()
        const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

        TodoService
            .updateTodo(updateone)
            .then(response =>
                setTodos(todos.map((el) => {
                    if (el.id === todo.id) {
                        return {
                            ...el, completed: !el.completed, end: time
                        }
                    }
                    return el;
                }
                )
                ))
        //tähän myös päivitys napille oma functio

    }
    return (
        <div className="todo-list">
            <li className={`todo-list${todo.completed ? "completed" : ''}`}>
                {name} <br></br>
                {content}<br></br>
                {begin} <br></br>
                {end} <br></br>
                <button onClick={deleteHandler} className="delete">DEL</button>
                <button onClick={completeHandler} className="done">READY</button>
                <button className="update">UPDATE</button>
            </li>
        </div>
    )
}
export default Todo;