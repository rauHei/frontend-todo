import React from "react";
import {
    Route,
    Routes,
    BrowserRouter,
} from "react-router-dom";
import TodoForm from "./components/TodoForm";
import UpdatetodoForm from "./components/UpdatetodoForm";
import './Main.css'

const Main = () => {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<TodoForm />} />
                    <Route path="/update" exact element={<UpdatetodoForm />} />
                </Routes>
            </BrowserRouter>
        </div>

    )
}
export default Main
