import React, { useContext } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { TodoAllData } from "./TodoApp";
const Todolist = () => {
    const { todoData, setTodoData } = useContext(TodoAllData)

    const statusColor = {
        'high': 'text-red',
        'midean': 'text-success',
        'low': 'text-warning'
    }

    const completedData = Object.keys(todoData).filter(data => todoData[data].pending).map(data => todoData[data])
    const nonCompleteData = Object.keys(todoData).filter(data => !todoData[data].pending).map(data => todoData[data])

    const handleStatus = (e, todoKey) => {
        {
            setTodoData(prev => ({ ...prev, [todoKey]: { ...prev[todoKey], pending: e.target.checked } }))
        }
    }

    const deleteData=(todoKey)=>{
        const copyData=structuredClone(todoData)
        delete copyData[todoKey];
        setTodoData(copyData)
    }

    return (
        <div className="container-fluid">
            <div className=" row">
                <div className="col-sm-6 mx-auto">
                    <h3 style={{ borderBottom: "2px solid black" }}>Complated</h3>

                    {
                        completedData.length != 0 ?
                            completedData.map(ele => (
                                <div className="justify-content-center">
                                    <input type="checkbox" className="h-25 w-25" checked={ele.pending} onChange={(e) => handleStatus(e, "todo" + ele.id)} />
                                    <span className={`${statusColor[ele.priority]}`}>{ele.todoName}</span>
                                    {/* <span style={{cursur:"pointer",height:"25px",width:"25px",borderRadius:"50%",textAlign:"center",lineHeight:"25px",backgroundColor:"red"}} className="text-light  float-end" onClick={()=>deleteData("todo"+ele.id)}>X</span> */}
                                    <DeleteIcon style={{cursur:"pointer",}} className="float-end text-danger" onClick={()=>deleteData("todo"+ele.id)}/>
                                </div>
                            ))

                            : <p className="text-center fs-4">no todos</p>
                    }
                </div>
            </div>

            <div className="row">
                <div className="col-sm-6 mx-auto">
                    <h3 style={{ borderBottom: "2px solid black" }}>Pending</h3>

                    {
                        nonCompleteData.length != 0 ?
                            nonCompleteData.map(ele => (
                                <div className="justify-content-center">
                                    <input type="checkbox" className="h-25 w-25" checked={ele.pending} onChange={(e) => handleStatus(e, "todo" + ele.id)} />
                                    <span className={`${statusColor[ele.priority]}`}>{ele.todoName}</span>
                                    {/* <span style={{cursur:"pointer",height:"25px",width:"25px",borderRadius:"50%",textAlign:"center",lineHeight:"25px",backgroundColor:"red"}} className="text-light  float-end" onClick={()=>deleteData("todo"+ele.id)}>X</span> */}
                                    <DeleteIcon style={{cursur:"pointer",}} className="float-end text-danger" onClick={()=>deleteData("todo"+ele.id)}/>


                                </div>
                            ))

                            : <p className="text-center fs-4">no todos</p>
                    }
                </div>
            </div>
        </div>
    );
}
export default Todolist;

