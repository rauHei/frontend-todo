import './App.css';
import TodoService from './services/todos'



function TodoForm({ todos, setTodos, setNewContent, newContent, setInputText, inputText, setStatus }) {


    const inputTextHandlerer = (e) => {
        setInputText(e.target.value);
        console.log('INPUTTEXT', inputText);
    }

    const textAreaHandlerer = (e) => {
        setNewContent(e.target.value);
        console.log('AREATEXT', newContent);
    }

    let today = new Date()
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    const submitTodohandler = (e) => {
        e.preventDefault();
        const newTodo = {
            name: inputText,
            content: newContent,
            begin: time,
            end: "",
            completed: false,
            id: Math.random() * 1000
        }

        TodoService
            .createTodo(newTodo)
            .then(response => {
                console.log('promise fulfilled')
                setTodos([...todos, {
                    name: inputText,
                    content: newContent,
                    begin: time,
                    completed: false,
                    id: Math.random() * 1000
                }])

            })

        setInputText('');
        setNewContent('');
    }
    const statusHandler = (e) => {
        setStatus(e.target.value);
    }

    return (
        <div>
            <h1>ToDo List</h1>
            <div>
                <label htmlFor="name">Task name and description:</label> <br></br>
                <br></br>
                <input type="text" id="name" value={inputText} onChange={inputTextHandlerer} />

                <br></br>
                <textarea type="text" id="content" value={newContent} onChange={textAreaHandlerer} />
                <button className='button' type="Submit" onClick={submitTodohandler}>Lisää</button>
            </div>
            <select onChange={statusHandler} name="todos" className='filter-todo'>
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Uncompleted">Uncompleted</option>
            </select>

            <ul id="todosList">
            </ul>
            <p id="infoText"></p>
        </div>
    );
}

export default TodoForm;
