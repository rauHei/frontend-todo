import './App.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoService from './services/todos';



import { useEffect, useState } from 'react';



function App() {

  //begintext
  const [initText, setInitState] = useState('');
  //todos
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [newContent, setNewContent] = useState('');
  const [status, setStatus] = useState('all');
  const [filtered, setFiltered] = useState([]);



  useEffect(() => {

    setInitState('Ladataan tehtävälista palvelimelta, odota...')

    TodoService
      .getAllTodos()
      .then(response => {
        console.log('promise fulfilled')
        setTodos(response.data)
      })
    filterHandlerer();
  }, [])


  const filterHandlerer = (() => {
    switch (status) {
      case "Completed":
        setFiltered(todos.filter((todo) => todo.complited === true))
        break;
      case "Uncompleted":
        setFiltered(todos.filter((todo) => todo.complited === false))
        break;
      default:
        setFiltered(todos)
        break;
    }
  }
  )
  console.log('FILT', filtered);
  return (

    <div id="container">


      <TodoForm
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        newContent={newContent}
        setNewContent={setNewContent}
        setStatus={setStatus}
      />
      {(todos.length === 0) ?
        <div>{initText}</div>
        :
        <TodoList
          todos={todos}
          setTodos={setTodos}
          filtered={filtered}
        />
      }


    </div>

  )
};


export default App;
