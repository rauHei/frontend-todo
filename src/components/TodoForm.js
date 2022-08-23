import './Todoform.css';
import TodoService from '../services/todos'
import { useEffect, useState } from 'react';
import TodoList from './TodoList';
import moment from 'moment';




function TodoForm() {

    //begintext
    const [initText, setInitState] = useState('');
    const [todos, setTodos] = useState([]);
    const [inputText, setInputText] = useState('');
    const [newContent, setNewContent] = useState('');
    const [status, setStatus] = useState(todos);
    const [filtered, setFiltered] = useState(null);


    useEffect(() => {

        setInitState('Klikkaa valikkoa niin näät muistiinpanosi..')

        TodoService
            .getAllTodos()
            .then(response => {
                setTodos(response.data)
            })
        // filterHandlerer()
    }, [status, setTodos, setFiltered])

    //filters shown notes
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
            case "Empty":
                window.location.reload()
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
    const day = moment().format('DD.MM.YY')
    const klo = moment().format('HH:mm:ss')
    const time = day + "  klo: " + klo

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
            <h1>To do list</h1>
            <form id="formialue">
                <label id="label" htmlFor="name">Task name:</label>
                <br></br>
                <input type="text" id="name" value={inputText} onChange={inputTextHandlerer} />
                <br></br>

                <label id="label" htmlFor="name">Description:</label>
                <br></br>
                <div id="kuvaus">
                    <textarea type="text" id="content" value={newContent} onChange={textAreaHandlerer} />
                    <br></br>
                </div>
                <br></br>
                <button className='button3' type="Submit" onClick={submitTodohandler}>Lisää</button>
                <div>
                    <select onChange={statusHandler} name="todos" className='filter-todo'>
                        <option value="Empty">Choose</option>
                        <option value="All">All</option>
                        <option value="Completed">Completed</option>
                        <option value="Uncompleted">Uncompleted</option>
                    </select>
                </div>
            </form>

            <div>
                {filtered === null
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
