import './Todoform.css';
import TodoService from '../services/todos'
import { useEffect, useState } from 'react';
import TodoList from './TodoList';




function TodoForm() {

    //begintext
    const [initText, setInitState] = useState('');
    const [todos, setTodos] = useState([]);
    const [inputText, setInputText] = useState('');
    const [newContent, setNewContent] = useState('');
    const [status, setStatus] = useState(todos);
    const [filtered, setFiltered] = useState([]);


    useEffect(() => {

        setInitState('Ladataan tehtävälista palvelimelta, odota...')

        TodoService
            .getAllTodos()
            .then(response => {
                setTodos(response.data)
            })

        filterHandlerer()
    }, [status, setTodos, setFiltered])

    const filterHandlerer = (() => {

        switch (status) {
            case "Completed":
                const b = todos.filter((b) => b.completed === true)
                setFiltered(b)
                break;
            case "Uncompleted":
                const d = todos.filter(b => b.completed === false)
                setFiltered(d)
                break;
            default:
                setFiltered(todos)
                break;
        }
    }
    )
    const inputTextHandlerer = (e) => {
        setInputText(e.target.value);
    }
    const textAreaHandlerer = (e) => {
        setNewContent(e.target.value);
    }

    let today = new Date()
    const time = today.getDate() + "." + today.getMonth() + "." + today.getFullYear() + " " + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    const submitTodohandler = (e) => {
        e.preventDefault();

        const newTodo = {
            name: inputText,
            content: newContent,
            begin: time,
            end: "",
            completed: false,
            id: Math.floor(Math.random() * 10000),
        }

        TodoService
            .createTodo(newTodo)
            .then((response) => {
                console.log('DATA', response.data);
            })

        setInputText('');
        setNewContent('');

        window.location.reload()
    }
    const statusHandler = (e) => {
        setStatus(e.target.value);
    }

    return (
        <div className='todo-form'>
            <h1>ToDo List</h1>
            <form id="formialue">
                <label id="label" htmlFor="name">Task name:</label>
                <br></br>
                <input type="text" id="name" value={inputText} onChange={inputTextHandlerer} />
                <br></br>
                <label id="label" htmlFor="name">Task description:</label>
                <br></br>
                <div id="kuvaus">
                    <textarea type="text" id="content" value={newContent} onChange={textAreaHandlerer} />
                    <br></br>
                </div>
                <br></br>
                <button className='button3' type="Submit" onClick={submitTodohandler}>Lisää</button>
                <div>
                    <select onChange={statusHandler} name="todos" className='filter-todo'>
                        <option value="All">All</option>
                        <option value="Completed">Completed</option>
                        <option value="Uncompleted">Uncompleted</option>
                    </select>
                </div>
            </form>

            <div>
                {filtered.length === 0
                    ? <div id="alkuteksti">
                        {initText}
                    </div>
                    :
                    <div>
                        <TodoList
                            todos={todos}
                            setTodos={setTodos}
                            filtered={filtered}
                        />
                    </div>
                }
            </div>
        </div>
    );
}

export default TodoForm;
