import React from 'react';
import TodoService from '../services/todos';
import './Todolist.css'
import { useNavigate } from 'react-router-dom'
import moment from 'moment';




function TodoList({ todos, setTodos, filtered }) {


    //DELETE 
    const deleteHandler = (e) => {
        e.preventDefault()
        let one = todos.filter((one) => one.id === e.target.value)
        let theone = one.map(o => o.id)
        console.log('DELETED', theone)

        TodoService
            .deleteTodo(theone)
            .then(() =>
                setTodos(todos.filter((el) => el.id !== theone)))

        window.location.reload()
    }

    let history = useNavigate();

    //Updates if task is finished
    const completeHandler = (e) => {
        e.preventDefault()

        let upone = todos.filter((a) => a.id === e.target.value)
        let updateone = upone.map(u => u.id)

        const time = moment().format('DD.MM.YYYY  HH:mm:ss')

        const updTodo = {
            completed: !false,
            end: time,
        }

        TodoService
            .updateTodo(updateone, updTodo)
            .then(response =>
                console.log('response', response))

        setTodos(todos.map((el) => {
            if (el.id === e.target.value) {
                return {
                    ...el, completed: !el.completed, end: time
                }
            }
            return el;
        }))
        window.location.reload()
    }

    //updates task itself
    const updateHandler = (e) => {
        e.preventDefault()
        window.localStorage.setItem("Id", e.target.value)
        history('/update')

    }

    console.log('Filtered', filtered);

    return (
        <ul className="todo-list2">
            {filtered.map((todo) => (

                <li key={todo.id} className={`todo-list${todo.completed ? "Completed" : ''}`}>
                    <h3>{todo.name}</h3> <br></br>
                    <p>{todo.content}</p><br></br>
                    <h4>start time: {todo.begin}</h4> <br></br>
                    <h4>finished: {todo.end}</h4> <br></br>
                    <button onClick={deleteHandler} value={todo.id} className="delete">DELETE</button>
                    <button onClick={completeHandler} value={todo.id} className={todo.completed === true ? 'done' : 'undone'}>READY</button>
                    <button onClick={updateHandler} value={todo.id} className="update">UPDATE</button>
                </li>
            )

            )}


        </ul>





    );

}
export default TodoList;

