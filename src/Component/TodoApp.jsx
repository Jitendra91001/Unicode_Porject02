import React, { createContext, useEffect, useState } from "react";
import Addtodo from "./AddTodo";
import Todolist from "./Todolist";
export const TodoAllData=createContext()
const TodoApp = () => {
    const [todoData,setTodoData]=useState({})
    const [Archive,setArchive]=useState([])
    const [showArchive, setShowArchive] = useState(false);
    useEffect(()=>{
        let localData=JSON.parse(localStorage.getItem("todoData"))
        let ArchiveData=JSON.parse(localStorage.getItem("ArchiveData"))
        if(localData){
            setTodoData(localData)
        }
        if(ArchiveData){
            setArchive(ArchiveData)
        }
    },[])

    useEffect(()=>{
        localStorage.setItem("todoData",JSON.stringify(todoData))
        localStorage.setItem("ArchiveData",JSON.stringify(Archive))
    },[todoData])

    return (
        <TodoAllData.Provider value={{todoData,setTodoData,Archive,setArchive, showArchive, setShowArchive}}>
        <div className="fluid-container mt-4">
            <Addtodo/>
            <br/>
            <Todolist/>
        </div>
        </TodoAllData.Provider>
    );
}

export default TodoApp;