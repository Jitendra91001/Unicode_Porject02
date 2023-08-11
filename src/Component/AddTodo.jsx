import React, { useCallback, useContext, useState } from "react";
import { TodoAllData } from "./TodoApp";
import { toast } from "react-toastify";
const initialData = {
    todoName: '',
    pending: false,
    priority: 'high'
}
const Addtodo = () => {
    const [initialState, setInitial] = useState(initialData)
    const { todoData, setTodoData, Archive, setArchive } = useContext(TodoAllData)



    const handleDataAdd = () => {
        let lastTodo = Object.keys(todoData).slice(-1)[0]

        console.log(lastTodo)
        if (lastTodo) {
            lastTodo = lastTodo.replace(/[a-zA-Z]/g, '');
            lastTodo = Number(lastTodo) + 1;

        } else {
            lastTodo = 1;
        }
        console.log(lastTodo);
        if (initialState.todoName === '') {
            toast.error("Please Enter the Title ...", {
                icon: "🚀"
            });
        } else {
            setTodoData((prev) => ({ ...prev, ["todo" + lastTodo]: { id: (lastTodo), ...initialState } }))
            setInitial(initialData)
        }

    }

    const handleChange = (e) => {
        setInitial((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const clearData = () => {
        const copyData = structuredClone(todoData)
        let nonCompleted = Object.keys(copyData).filter(data => copyData[data].pending)
        let Completed = Object.keys(copyData).filter(data => !copyData[data].pending)

        let base = {};

        Completed.map(todo => {
            base[todo] = copyData[todo];
        })

        setTodoData(base)

        setArchive(prev => [...prev, ...nonCompleted.map(todo => copyData[todo])])



    }



    return (
        <div className="row">
            <div className="col-sm-6 mx-auto">
                <div className="card">
                    <div className="card-header">
                        <h4>Todo Form</h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="input-group-list">
                                    <label for="todotext">Enter the  Title: </label>
                                    <input type="text" name="todoName" placeholder="Enter the text" onChange={handleChange} value={initialState.todoName} onKeyDown={(({ key }) => key === 'Enter' && handleDataAdd())} className="form-control" />
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="input-group-list">
                                    <label for="todotext">Priority : </label>
                                    <select name="priority" className="form-control" onChange={handleChange} value={initialState.priority}>
                                        <option value="high">high</option>
                                        <option value="medium">medium</option>
                                        <option value="low">low</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-success" onClick={handleDataAdd}>ADD</button>
                        <button className="btn btn-warning float-end" onClick={clearData}>Clear Complited</button>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default Addtodo;