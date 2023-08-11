import React from "react"
import ReactPaginate from 'react-paginate';
import DeleteIcon from "@mui/icons-material/Delete";

const Table = ({currentItems,Color,handleStatus,status,deleteData,handlePageClick,pageCount})=>{
    return (
        <>
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
                      {currentItems.length != 0 ? (
                        currentItems.map((ele) => (
                          <tr>
                            <td>{ele.id}</td>
                            <td>
                              <span title={"Title :" + ele.todoName} className={`${Color[ele.priority]}`}>
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
                            <td title={"status :" + ele.pending.toString() === status ? "Completed" : "Pending"} className={`${Color[ele.priority]}`}>
                              {ele.pending === true ? "Completed" : "Pending"}
                            </td>
                            <td title={"Priority :" + ele.priority} className={`${Color[ele.priority]}`}>
                              {ele.priority}
                            </td>
                            <td>

                              {
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
        </>
    );
}

export default Table;