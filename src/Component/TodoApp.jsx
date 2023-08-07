import React, { createContext, useEffect, useState } from "react";
import Addtodo from "./AddTodo";
import Todolist from "./Todolist";
export const TodoAllData=createContext()
const TodoApp = () => {
    const [todoData,setTodoData]=useState({})
    useEffect(()=>{
        let localData=JSON.parse(localStorage.getItem("todoData"))
        if(localData){
            setTodoData(localData)
        }
    },[])

    useEffect(()=>{
        localStorage.setItem("todoData",JSON.stringify(todoData))
    },[todoData])

    return (
        <TodoAllData.Provider value={{todoData,setTodoData}}>
        <div className="fluid-container mt-4">
            <Addtodo/>
            <br/>
            <Todolist/>
        </div>
        </TodoAllData.Provider>
    );
}

export default TodoApp;