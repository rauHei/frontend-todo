import React, { useState, useEffect } from 'react';
import TodoService from '../services/todos'
import { useNavigate } from 'react-router-dom'


//KESKEN!!!

function UpdatetodoForm({ todos, begin }) {

    const [id, setId] = useState(null)
    const [name, setName] = useState('')
    const [content, setContent] = useState('')
    const [newContent, setNewContent] = useState(null)


    useEffect(() => {

        setId(localStorage.getItem('Id'))


    }, [])

    let history = useNavigate();

    const inputTextHandlerer = (e) => {
        setName(e.target.value);
        console.log('INPUTTEXT', name);
    }

    const textAreaHandlerer = (e) => {
        setContent(e.target.value);
        console.log('AREATEXT', content);
    }

    const handleSubmit = () => {
        const newNote = {
            name: name,
            content: content,
            begin: begin,
            copleted: false

        }
        TodoService
            .updateTodoContent(id, newNote)
            .then((data) => {
                setNewContent(data)

            })

        history("/")
    }


    return (
        <div className='todo-form'>
            <h1>Update ToDo List</h1>
            <form onSubmit={handleSubmit} id="formialue">
                <label id="label" htmlFor="name">Updated task name:</label>
                <br></br>
                <input type="text" id="name" onChange={inputTextHandlerer} />
                <br></br>

                <label id="label" htmlFor="name"> Updated task description:</label>
                <br></br>
                <div id="kuvaus">
                    <textarea type="text" id="content" onChange={textAreaHandlerer} />
                    <br></br>
                </div>
                <br></br>

                <button className='button3' type="Submit" >Lisää</button>

            </form>

        </div>
    )


}
export default UpdatetodoForm;