import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { TodoAllData } from "./TodoApp";
import { toast } from "react-toastify";
import ReactPaginate from 'react-paginate';
const Todolist = ({ itemsPerPage=4 }) => {
  const { todoData, setTodoData,Archive, setArchive, showArchive, setShowArchive} = useContext(TodoAllData);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [itemOffset, setItemOffset] = useState(0);
  const [unArchive, setUnArchive] = useState([]);
  // const [totalData,setTotalData]=useState(Object.values(todoData))
  let totalData = Object.values(todoData);

  // const[currentItems,setCurrentItems]=useState(totalData)
  const endOffset = itemOffset + itemsPerPage;
  let currentItems = showArchive ? Archive.slice(itemOffset, endOffset) : totalData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(totalData.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % totalData.length;
    setItemOffset(newOffset);
  };

  const Color = {
    high: "text-dark",
    medium: "text-warning",
    low: "text-success",
  };
 
  const handleStatus = (e, todoKey) => {
    {
      setTodoData((prev) => ({
        ...prev,
        [todoKey]: { ...prev[todoKey], pending: e.target.checked },
      }));
    }
  };

  const deleteData = (todoKey, isArchive=false) => {

    console.log(todoKey)
    if(isArchive){

      if (window.confirm("Are You sure...")) {
        let copyData = structuredClone(Archive);
        copyData = copyData.filter(todo=>todo.id!=todoKey)

        setArchive(copyData);
        toast.success("Deleted successfuly", {
          icon: "🚀",
        });
      }

    }else{

      if (window.confirm("Are You sure...")) {
        const copyData = structuredClone(todoData);
        delete copyData[todoKey];
        setTodoData(copyData);
        toast.success("Deleted successfuly", {
          icon: "🚀",
        });
      }
    }

  };

  const handleArchive=()=>{
     currentItems = [...Archive];
     setShowArchive((prev)=>!prev);
  }

  const searchItem = (e) => {
    setSearch(e.target.value);

  };


  if (search || priority || status) {

    currentItems = [...totalData].filter(todo => {
      return ((search ? todo.todoName.toLowerCase().includes(search.toLowerCase()) : true) && (priority && priority != 'all' ? todo.priority === priority : true) &&
        (status && status != 'all' ? (status === 'pending' ? !todo.pending : todo.pending) : true)
      )
    })

    currentItems = currentItems.slice(itemOffset, endOffset);
  }

  const handleSelectUnArchive = (id) =>
  {
    if(unArchive.includes(id))
    {
      let copyData = [...unArchive];
      copyData = copyData.filter(existingId=>existingId!=id);
      setUnArchive(copyData)
    }
    else{
      setUnArchive([...unArchive, id]);
    }
  }

  const handleUnArchive = () =>
  {
    let allData  = [];

    let updatedArchive = Archive.filter(todo=>
    {
      if(unArchive.includes(todo.id))
      {
        allData.push(todo);
        return false;
      }
      return true;
    })
    let obj = {}
    allData.map(todo=>
    {
      let base = {
        ...todo
      }
      
      obj['todo'+todo.id] = base;
    })

    setTodoData((prev)=>({...prev, ...obj}));

    setArchive(updatedArchive);

  }

  return (
    <div className="container-fluid">
      <div className=" row d-flex">
        <div className="col-sm-10 mx-auto">
          <div className="card">
            <div className="card-header">
              <div className="row">
                {/* <div className="col-sm-6">
                  <h4>Todo list</h4>
                </div> */}
                <div className="col-sm-3">
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

                <div className="col-sm-3">
                  <div className="input-group-list">
                    <label>Priority :</label>
                    <select onChange={(e) => setPriority(e.target.value)} className="form-control" defaultValue='all' >
                      <option value="high">high</option>
                      <option value="medium">medium</option>
                      <option value="low">low</option>
                      <option value="all">all</option>
                    </select>
                  </div>
                </div>

                <div className="col-sm-3">
                  <div className="input-group-list">
                    <label>Status :</label>
                    <select onChange={(e) => setStatus(e.target.value)} className="form-control" defaultValue={'all'}>
                      <option value="pending">Pending</option>
                      <option value="complete">Completed</option>
                      <option value="all">all</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-3 d-flex" style={{transform:"translateY(23px)"}}>
                  <div className="input-group-list d-flex justify-content-around align-items-center w-100">
                  <button className="btn btn-success align-self-start" onClick={handleArchive}>Archive {`(${Archive.length})`}</button>
                  {
                    showArchive && <button className="btn btn-success align-self-start" onClick={handleUnArchive}>unArchive{`(${unArchive.length})`}</button>
                    
                    
                  }
                  {/* <button className="btn btn-danger ms-4">Selected Status</button> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row mt-2">
                <div className="col-sm-6 w-100">
                  <p> { showArchive && 'Archive'}</p>
                  <table className="table table-striped table-bordred text-center">
                    <thead>
                      <tr>
                      <th>{showArchive?'select':null}</th>
                        <th>Serial No</th>
                        <th>Title</th>
                        <th>{showArchive ?null:'Status'}</th>
                        <th>Status Coad</th>
                        <th>Priority</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length != 0 ? (
                        currentItems.map((ele) => (
                          <tr>
                          <td>
                            {
                              showArchive ?  <input
                              type="checkbox"
                              className="h-25 w-25"
                              onClick={()=>handleSelectUnArchive(ele.id)}
                            />:null
                            }
                          </td>
                            <td>{ele.id}</td>
                            <td>
                              <span title={"Title :" + ele.todoName} className={`${Color[ele.priority]}`}>
                                {ele.todoName}
                              </span>
                            </td>
                            <td>
                             {
                              showArchive ?
                             null
                              : <input
                              type="checkbox"
                              className="h-25 w-25"
                              checked={ele.pending}
                              onChange={(e) =>
                                handleStatus(e, "todo" + ele.id)
                              }
                            />
                             }
                            </td>
                            <td title={"status :" + ele.pending.toString() === status ? "Completed" : "Pending"} className={`${Color[ele.priority]}`}>
                              {ele.pending === true ? "Completed" : "Pending"}
                            </td>
                            <td title={"Priority :" + ele.priority} className={`${Color[ele.priority]}`}>
                              {ele.priority}
                            </td>
                            <td>

                              {

                                showArchive ?
                                <DeleteIcon
                                  style={{ cursur: "pointer" }}
                                  className="float-end text-danger"
                                  onClick={() => deleteData(ele.id, true)}
                                />
                                :
                                (ele.pending === false) ? <DeleteIcon
                                  style={{ cursur: "pointer" }}
                                  className="float-end text-danger"
                                  onClick={() => deleteData("todo" + ele.id)}
                                /> : null
                              }

                            </td>
                          </tr>
                        ))
                      ) : (
                        <p className="text-center w-100">No Todos</p>
                      )}
                    </tbody>
                  </table>
                  <ReactPaginate
                  className="d-flex list-unstyled text-decoration-none gap-4"  
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Todolist;
