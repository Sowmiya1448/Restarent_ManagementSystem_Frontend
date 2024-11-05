import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'



const Stock_list = () => {

    const [stock, setStock] = useState([])

    const [laptop, setLaptop] = useState([])

    const [category, setCategory] = useState([])

    const navigate = useNavigate()

    useEffect(() => {

        axios.get('http://127.0.0.1:8001/stock/all/')
            .then(response => {

                console.log(response.data, "stock")

                setStock(response.data)
            })
            .catch(error => console.log(error))


        axios.get('http://127.0.0.1:8001/laptop/all')

            .then(response => {
                console.log(response.data, "laptop")
                setLaptop(response.data)
            })


            const headers ={

                'content-Type':'application/json',
                'Authorization':` Bearer ${localStorage.getItem('Bearer')}`
    
            }

        axios.get('http://127.0.0.1:8001/category/all/',{headers})
            .then(response => {

                setCategory(response.data)
            })
            .catch(error => console.log(error));

    }, [])


    let lap = laptop.length > 0 && laptop.map((data, index) => {

        let categorys = category.find(c => c._id === data.category_ref)

        for (let stocky of stock) {

            if (data._id === stocky.laptop_reference) {

                return (

                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{categorys ? categorys.categoryname:'-'}</td>
                        <td>{data.brandname}</td>
                        <td>{data.modelno}</td>
                        <td>{stocky.stocklist}</td>
                        <td> <button className='btn btn-info' onClick={() => navigate(`/addstock/${stocky._id}/`)}>+Add stock</button></td>
                         <td><button className='btn btn-secondary' onClick={() => navigate(`/updatestock/${stocky._id}/`)}>Update</button></td>
                    </tr>

                )
            }
        }
    })

    return (

        <div>
          

            <h2 className='text-center'>Stock_list</h2> <br /><br />



            <div className='container-fluid'>
                <table className='table table-bordered text-center' style={{ width: '75%', marginLeft: "10%" }} >
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Category</th>
                            <th>Laptop_name</th>
                            <th>Model</th>
                            <th>Stock</th>
                            <th>ADD</th>
                            <th>Update</th>

                        </tr>
                    </thead>
                    <tbody>
                        {lap}
                    </tbody>
                </table>
            </div>




        </div>
    )
}

export default Stock_list