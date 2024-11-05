import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Stock = () => {

    const [category, setCategory] = useState([])

    const [cateid, setCateid] = useState([])

    const [stocklist, setStocklist] = useState([])

    const [stock_data,setStockdata] = useState([])

    const [laptop, setLaptop] = useState([])
    

const submitHandle = (event) => {

        event.preventDefault()


        axios.get('http://127.0.0.1:8001/stock/all/')
        .then(response => {
            // console.log(response.data,"stock_list")
            setStocklist(response.data)
         
        })
        .catch(error => console.log(error));

        axios.get('http://127.0.0.1:8001/laptop/all')

        .then(response => {
            // console.log(response.data, "laptop")
            setLaptop(response.data)
        })
}

useEffect(() =>{

    if(stocklist.length> 0)
        {
          const stockdata = stocklist.filter(data => data.category_ref === cateid)
        
          console.log(stockdata,"stockdata")
          setStockdata(stockdata)

        }
},[stocklist])


let lap = stock_data.length > 0 ? laptop.map((data, index) => {

    let categorys = category.find(c =>c._id === data.category_ref)

    for (let stocky of stock_data) {

        if (data._id === stocky.laptop_reference) {

            return (
        
                <tr key={index}>
            
                    <td>{categorys.categoryname}</td>
                    <td>{data.brandname}</td>
                    <td>{data.modelno}</td>
                    <td>{stocky.stocklist}</td>
               
                </tr>
            )

        }}

}) : <tr>
    <td colSpan={8}>NO DATA FOUND</td>
</tr>


const categorys = category.map((cat, index) => {

        return (

            <option key={index} value={cat._id}>{cat.categoryname}</option>
        )
    })

    useEffect(() => {


        
        const headers ={

            'content-Type':'application/json',
            'Authorization':` Bearer ${localStorage.getItem('Bearer')}`

        }

         axios.get('http://127.0.0.1:8001/category/all/',{headers})
            .then(response => {
                // console.log(response.data,"categorydata")
                setCategory(response.data)
            })
            .catch(error => console.log(error));

 }, [])

    useEffect(() => {
        console.log(cateid,"category_id")
        
    }, [cateid])

    return (


        <div>
            <h2 className='text-center'>Stock Details</h2> <br /> <br />

            <div className='container-fluid text-center' >

                <label>Category: &nbsp; </label>

                <select onChange={event => setCateid(event.target.value)}>
                    <option value="" >select a category</option>
                    {categorys}
                </select> &nbsp; &nbsp;

                <input type="submit" className='btn btn-info' onClick={(event) => submitHandle(event)} /> <br /> <br />
              

            </div>

            
                <div>
                <h2 className='text-center'>Stock_list</h2> <br /><br />

                <div className='container-fluid'>
                 <table className='table table-bordered text-center' style={{width:'75%',marginLeft:"10%"}} >
                     <thead>
                         <tr>
                           
                             <th>Category</th>
                             <th>Laptop_name</th>
                             <th>Model</th>
                             <th>Stock</th>
                             
                         </tr>
                     </thead>
                     <tbody>
                      {lap}
                     </tbody>
                 </table>
                 </div>

             </div>
         </div>

    )
}

export default Stock