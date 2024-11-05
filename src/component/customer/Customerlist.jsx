import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Customerlist = () => {

    const navigate = useNavigate()
    const [customer_list, setClist] = useState([])

    useEffect(() => {

        axios.get("http://127.0.0.1:8001/customer/all")
            .then(response => {
                // console.log(response.data)
                setClist(response.data)
            })
            .catch(error => console.log(error))

    }, [])

    const deletehandle = (data) => {

        axios.delete(`http://127.0.0.1:8001/customer/${data._id}`)
            .then(response => {
                // console.log(response.data)

               const duplicate = [...customer_list]
                duplicate.splice(customer_list.findIndex(cat => cat._id === data._id), 1)
                setClist(duplicate)

            })
            .catch(error => console.log(error))



    }


    let result = customer_list.length > 0 ? customer_list.map((data, index) => {

        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.customername}</td>
                <td>{data.companyname}</td>
                <td>{data.address}</td>
                <td>{data.email}</td>
                <td>{data.phonenumber}</td>
                <td><button className='btn btn-info' onClick={() => navigate(`/customerupdate/${data._id}`)}>Update</button></td>
                <td><button className='btn btn-danger' onClick={() => deletehandle(data)}>x</button></td>
            </tr>


        )
    }) : <tr>
        <td colSpan={15}>NO DATA FOUND</td>
    </tr>






    return (
        <div>
          
            <h2 className='text-center'>Customer List</h2> <br />

            <div className='container-fluid'>
                <button className='btn btn-info float-end' onClick={() => navigate('/addcustomer')}>+Add customer</button> <br /><br />
            </div>

            <div className='container-fluid'>
                <table className='table table-bordered text-center' style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Customer name</th>
                            <th>Company name</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Phone no</th>
                            <th>Update</th>
                            <th>Delete</th>
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

export default Customerlist