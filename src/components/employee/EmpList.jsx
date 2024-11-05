import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import edit from '../images/edit.png'
import del from '../images/trash-can.png'



const EmpList = () => {

    const navigate = useNavigate()

    const[emp,setEmp] = useState([])
    const[emprole,setEmprole] = useState([])
    const[empdel,setEmpdel] = useState([])


    useEffect(() =>{

        axios.get("http://127.0.0.1:5000/employee/all")
        .then(response =>{
            
            setEmp(response.data)
        })
        .catch(error =>console.log(error))

        axios.get("http://127.0.0.1:5000/emprole/all")
        .then(response =>{
           
            setEmprole(response.data)
        })
        .catch(error =>console.log(error))
    },[])



    let result = emp.length >0 ?emp.map((data,index) =>{

        let roles = emprole.find(rol =>rol._id === data.category_ref)


        return(
           <tr key={index}>
            <td>{index+1}</td>
            <td>{data.empid}</td>
            <td><img src={data.image} alt="" width={"70px"} height={"70px"} /></td>
            <td>{roles ? roles.categoryname : '-'}</td>
            <td>{data.empname}</td>
            <td>{data.age}</td>
            <td>{data.gender}</td>
            <td>{data.phno}</td>
            <td>{data.address}</td>
            <td>{data.salaryPerDay}</td>
            <td><button className='btn' onClick={() =>navigate(`/empupdate/${data._id}`)}> <img src={edit} height={"30px"} width={"30px"} /></button></td>
            <td><button className='btn' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() =>setEmpdel(data)}><img src={del} height={"30px"} width={"30px"}/></button></td>
           </tr>
        )
    }): <tr>
        <td colSpan={15}>
            NO DATA FOUND
        </td>
    </tr>

    const deletehandle = () =>{

        axios.delete(`http://127.0.0.1:5000/employee/${empdel._id}`)
        .then(response =>{
            console.log(response.data)

            let duplicate = [...emp]
            duplicate.splice(emp.findIndex(e =>e._id === empdel._id),1)
            setEmp(duplicate)

         })
        .catch(error =>console.log(error))
}


  return (


    <div style={{paddingLeft:"20rem"}}>
        <h2 className='text-center head'>Employee List</h2> <br />


        
        <div className='container-fluid'>
                <button className='btn btn-outline-info float-end' onClick={() => navigate('/empadd/')}>
                    + Add Employee
                </button> <br /> <br />
            </div>
            <br />


            <div style={{width:'60%',marginLeft:"10%" }} >
                <table className="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th>S.NO</th>
                             <th>Emp_ID</th>
                            <th>Image</th>
                            <th>Role</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Phno</th>
                            <th>Address</th>
                            <th>Salary/Day</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                   {result}
                    </tbody>
                </table>
            </div>




            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Delete</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete {empdel.empid}?</p>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={deletehandle} >delete</button>
                        </div>
                    </div>
                </div>
            </div>




    </div>
  )
}

export default EmpList