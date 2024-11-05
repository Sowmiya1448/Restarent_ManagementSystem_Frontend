import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Empview = () => {



    const navigate = useNavigate()

    const params = useParams()

    const { id } = params

    const [emp, setEmp] = useState([])


    useEffect(() => {

        axios.get("http://127.0.0.1:5000/employee/all")
            .then(response => {
                console.log(response.data, "emp")
                setEmp(response.data)
            })
            .catch(error => console.log(error))



    }, [])


    let result = emp.length > 0 ? emp.map((data, index) => {

        if (data.category_ref === id) {
            return (
                <tr key={data._id}>

                    <td><img src={data.image} alt="" width={"70px"} height={"70px"} /></td>
                    <td>{data.empid}</td>
                    <td>{data.empname}</td>

                </tr>
            )
        }

    }) : <tr>
        <td colSpan={8}>
            NO DATA FOUND
        </td>
    </tr>


    return (

        <div style={{paddingLeft:"20rem"}}>
            
            <h2 className='text-center head'>Employee View</h2> <br />  <br />

            <div className='container-fluid'>
                <button className='btn btn-secondary float-end' onClick={() => navigate('/emprole/')}>Back</button>
            </div>
            <br /> <br />

            <div className='container-fluid' style={{ width: "70%" }}>
                <table className='table table-bordered'>
                    <thead>
                        <tr>

                            <th>Image</th>
                            <th>Emp ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result}
                    </tbody>
                </table>
            </div>




        </div>
    )
}

export default Empview