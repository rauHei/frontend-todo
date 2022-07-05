import axios from 'axios';
const baseUrl = 'http://localhost:3000/todos'

const getAllTodos = () => {
    return axios.get(baseUrl)
}

const createTodo = newObject => {
    return axios.post(baseUrl, newObject)
}

const updateTodo = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}
const deleteTodo = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}



export default {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo
};

