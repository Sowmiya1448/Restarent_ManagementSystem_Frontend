import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Role = () => {


    const navigate = useNavigate()


    const [Role_name, setRolename] = useState('')
    const [roledata, setRoledata] = useState([])

    const[emp,setEmp] = useState([])
    const[del,setDel] = useState([])


    useEffect(() => {

        axios.get("http://127.0.0.1:5000/emprole/all")
            .then(response => {
            
                setRoledata(response.data)

            })
            .catch(error => console.log(error))


            axios.get("http://127.0.0.1:5000/employee/all")
            .then(response =>{

                console.log(response.data,"emp")
                setEmp(response.data)
            })
            .catch(error =>console.log(error))

    }, [])

    const submithandle = (event) => {

        event.preventDefault()
        const data = {
            
            categoryname: Role_name
        }

        axios.post("http://127.0.0.1:5000/emprole/add/", data)
            .then(response => {
                console.log(response.data, "data received in emprole")
                setRolename('')

                const updated_role_data = [...roledata, response.data]

                setRoledata(updated_role_data)
            })
            .catch(error => console.log(error))
    }





let result = roledata.length > 0 ? roledata.map((data, index) => {

    const employeeCount = emp.filter(employee => employee.category_ref === data._id).length

 return (

            <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.categoryname}</td>
                <td>{employeeCount}</td>
                <td><button className='btn btn-info' onClick={() =>navigate(`/empview/${data._id}`)}>View</button></td>
                <td><button className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() =>setDel(data)}>X</button></td>

            </tr>
        )
    }) : <tr>
        <td>NO DATA FOUND</td>
    </tr>


const deletehandle = () =>{

    axios.delete(`http://127.0.0.1:5000/emprole/${del._id}`)
    .then(response =>{
        console.log(response.data)

        let duplicate = [...roledata]
        duplicate.splice(roledata.findIndex(role =>role._id === del._id),1)
        setRoledata(duplicate)

     })
    .catch(error =>console.log(error))

}





    return (

        <div style={{paddingLeft:"20rem"}}>

           <h2 className='text-center head'>Employee Category</h2> <br /> <br />

            <div style={{ marginLeft: "33%" }}>

                <label htmlFor="">category type : </label>&nbsp;
                <input type="text" value={Role_name} onChange={event => setRolename(event.target.value)} style={{border:"2px solid black"}}/>&nbsp;

                <input type="submit" className='btn btn-outline-info' onClick={event => submithandle(event)} />
            </div> <br /> <br />

            <h2 className='text-center'> Category List</h2>

            <table className='table table-bordered' style={{ width: "40%", marginLeft: "30%" }}>
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Category</th>
                        <th>count</th>
                        <th>View</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {result}
                </tbody>
            </table>



            
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Delete</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete {del.categoryname}?</p>

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

export default Role