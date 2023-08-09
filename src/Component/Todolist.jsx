import React, { useContext, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { TodoAllData } from "./TodoApp";
import { toast } from "react-toastify";
const Todolist = () => {
  const { todoData, setTodoData } = useContext(TodoAllData);
  const [search, setSearch] = useState("");
  const [priority,setPriority]=useState('');
  const [status,setStatus]=useState('');


  const statusColor = {
    high: "text-dark",
    medium: "text-warning",
    low: "text-success",
  };
  let totalData = Object.values(todoData);
  const handleStatus = (e, todoKey) => {
    {
      setTodoData((prev) => ({
        ...prev,
        [todoKey]: { ...prev[todoKey], pending: e.target.checked },
      }));
    }
  };

  const deleteData = (todoKey) => {
    if (window.confirm("Are You sure...")) {
      const copyData = structuredClone(todoData);
      delete copyData[todoKey];
      setTodoData(copyData);
      toast.success("Deleted successfuly", {
        icon: "🚀",
      });
    }
  };

  const searchItem = (e) => {
    setSearch(e.target.value);
    
  };
  totalData=totalData.filter(data=>data.todoName.toLowerCase().includes(search.toLowerCase()))

  if(priority !=='' && priority !=='all'){
  totalData=totalData.filter(data=>data.priority===priority)
  }else if(priority==='all'){
    totalData = [...totalData]
  }

  if(status !== '' && status !== 'all')
  {
    totalData=totalData.filter(data=>data.pending.toString()===status)
  }else if(status==='all'){
    totalData=[...totalData]
  }
  return (
    <div className="container-fluid">
      <div className=" row">
        <div className="col-sm-6 mx-auto">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-sm-6">
                  <h4>Todo list</h4>
                </div>
                <div className="col-sm-6">
                  <div className="input-group-list">
                    <label>Search Item : </label>
                    <input
                      type="text"
                      name="search"
                      placeholder="enter the title"
                      onChange={(e) => searchItem(e)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                    <div className="input-group-list">
                        <label>Priority :</label>
                        <select onChange={(e)=>setPriority(e.target.value)} className="form-control" >
                            <option value="high">high</option>
                            <option value="medium">medium</option>
                            <option value="low">low</option>
                            <option value="all">all</option>
                        </select>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="input-group-list">
                        <label>Status :</label>
                        <select onChange={(e)=>setStatus(e.target.value)} className="form-control" >
                            <option value="false">Pending</option>
                            <option value="true">Completed</option>
                            <option value="true">all</option>
                        </select>
                    </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row mt-2">
                <div className="col-sm-6 w-100">
                  <table className="table table-striped table-bordred text-center">
                    <thead>
                      <tr>
                        <th>Serial No</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Status Coad</th>
                        <th>Priority</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {totalData.length != 0 ? (
                        totalData.map((ele) => (
                          <tr>
                            <td>{ele.id}</td>
                            <td>
                              <span title={"Title :"+ele.todoName} className={`${statusColor[ele.priority]}`}>
                                {ele.todoName}
                              </span>
                            </td>
                            <td>
                              <input
                                type="checkbox"
                                className="h-25 w-25"
                                checked={ele.pending}
                                onChange={(e) =>
                                  handleStatus(e, "todo" + ele.id)
                                }
                              />
                            </td>
                            <td title={"status :"+ele.pending.toString()===status? "Completed" : "Pending"} className={`${statusColor[ele.priority]}`}>
                              {ele.pending === true ? "Completed" : "Pending"}
                            </td>
                            <td title={"Priority :"+ele.priority} className={`${statusColor[ele.priority]}`}>
                              {ele.priority}
                            </td>
                            <td>
                              
                             {
                              (ele.pending===false)? <DeleteIcon
                              style={{ cursur: "pointer" }}
                              className="float-end text-danger"
                              onClick={() => deleteData("todo" + ele.id)}
                            />:null
                             }
                            </td>
                          </tr>
                        ))
                      ) : (
                        <p className="text-center w-100">No Todos</p>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row">
                <div className="col-sm-6 mx-auto">
                    <div className="card">
                        <div className="card-header">
                            <h4>Pending</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-6 w-100">
                                    <table className="table table-striped table-bordered text-center">
                                        <thead>
                                            <tr>
                                                <th>checkbox</th>
                                                <th>Title</th>
                                                <th>Priority</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                nonCompleteData.length != 0 ?
                                                    nonCompleteData.map((ele) => (
                                                        <tr>
                                                            <td><input type="checkbox" className="h-25 w-25" checked={ele.pending} onChange={(e) => handleStatus(e, "todo" + ele.id)} /></td>
                                                            <td> <span title={ele.priority} className={`${statusColor[ele.priority]}`}>{ele.todoName}</span></td>
                                                            <td className={`${statusColor[ele.priority]}`} >{ele.priority}</td>
                                                            <td> <DeleteIcon style={{ cursur: "pointer", }} className="float-end text-danger" onClick={() => deleteData("todo" + ele.id)} /></td>
                                                        </tr>
                                                    )) :
                                                    <p className="text-center">No Todos</p>

                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
    </div>
  );
};
export default Todolist;
