import React, { useCallback, useContext, useState } from "react";
import { TodoAllData } from "./TodoApp";
const initialData={
    todoName:'',
    pending:false,
    priority:'high'
}   
const Addtodo=()=>{
    const [initialState,setInitial]=useState(initialData)
    const {todoData,setTodoData}=useContext(TodoAllData)

    

    const handleDataAdd=()=>{
        if(initialState.todoName==''){
            alert("please enter the text...")
        }
        let lastTodo=Object.keys(todoData).slice(-1)[0]
        console.log(lastTodo)
        if(lastTodo){
            lastTodo=Number(lastTodo.slice(-1)[0])+1;
        }else{
            lastTodo=1;
        }
        setTodoData((prev)=>({...prev,["todo"+lastTodo]:{id:(lastTodo),...initialState}}))
        setInitial(initialData)

        console.log(todoData)
    }

    const handleChange=(e)=>{
        setInitial((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    const clearData=()=>{
        const  copyData=structuredClone(todoData)
        let nonCompleted=Object.keys(copyData).filter(data=>copyData[data].pending)

        nonCompleted.map(ele=>{
            delete copyData[ele]
        })

        setTodoData(copyData)
    }
    return(
            <div className="row">
                <div className="col-sm-6 mx-auto d-inline-block">
                    <input type="text" name="todoName" placeholder="Enter the text" onChange={handleChange} value={initialState.todoName} onKeyDown={(({key})=>key==='Enter' && handleDataAdd())} className="form-control"/>
                    <select name="priority" className="form-control mt-3" onChange={handleChange} value={initialState.priority}>
                        <option value="high">high</option>
                        <option value="midean">midean</option>
                        <option value="low">low</option>
                    </select>
                    <button className="btn btn-success mx-2 my-3" onClick={handleDataAdd}>Add</button>
                    <button className="btn btn-warning" onClick={clearData}>Clear Complited</button>
                </div>
        </div>
    );
}
export default Addtodo;