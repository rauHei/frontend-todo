import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/todos'

const getAllTodos = async () => {
    const data = await axios.get(baseUrl)
    return data
}

const createTodo = async newObject => {
    const response = await axios.post(baseUrl, newObject)
    return response.data
}

const updateTodo = async (id, newObject) => {

    const newTodo = {
        end: newObject.end,
        completed: true,

    }

    const upd = await axios.put(`${baseUrl}/${id}`, newTodo)
    return upd.data
}

const updateTodoContent = async (id2, newObject2) => {

    const newTodo2 = {
        name: newObject2.name,
        completed: false,
        begin: newObject2.begin,
        content: newObject2.content
    }

    const response = await axios.put(`${baseUrl}/${id2}`, newTodo2)
    return response.data
}


const deleteTodo = async (id) => {
    const request = await axios.delete(`${baseUrl}/${id}`)
    return request.id
}



export default {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    updateTodoContent
};

