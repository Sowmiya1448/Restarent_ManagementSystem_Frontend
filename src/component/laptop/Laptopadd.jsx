import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/laptop.css'

const Laptopadd = () => {

    const navigate = useNavigate()

    const [brand, setBrand] = useState('')

    const [modelno, setModelno] = useState('')

    const [price, setPrice] = useState('')

    const [category, setCategory] = useState([])

    const [cateid, setCateid] = useState([])

 
useEffect(() => {

        axios.get('http://127.0.0.1:8001/category/all/')
            .then(response => {
                console.log(response.data)
                setCategory(response.data)
            })
            .catch(error => console.log(error));

    }, [])


    useEffect(() => {
        console.log(cateid,"cateid")
       
    }, [cateid])

    const submitHandle = (event) => {

        event.preventDefault()

        const data = {
            brandname: brand,
            modelno: modelno,
            price: price,
            category_ref: cateid,
        
        }
           axios.post('http://127.0.0.1:8001/laptop/add/', data)
            .then(response => {
              
                console.log(response.data._id,"lapid")

                const laptopId = response.data._id;

                const stockdata = {

                    laptop_reference:laptopId,
                    category_ref: cateid,
                    stocklist:0
                    
                    }

                   axios.post('http://127.0.0.1:8001/stock/add',stockdata) 
                   .then(response =>{
            
                    console.log(response.data)
                    navigate('/laptop/')
            
                    })  
                 
                .catch(error =>console.log(error))  

            })
}

   const categorys = category.map((cat, index) => {

        return (

            <option key={index} value={cat._id}>{cat.categoryname}</option>
        )
    })


    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Add LaptopList</h2>
            <div className='container'>
                <button className='btn btn-info float-end' onClick={() => navigate('/laptop/')}>Back</button> <br />
            </div>
            <div className='container-fluid'>
                <form action="" style={{width:"50%",marginLeft:"25%"}}>

                  <label>category: </label>
                    <select className='form-control' onChange={event => setCateid(event.target.value)}>
                        <option value="" >select a category</option>
                        {categorys}
                    </select>

                    <label htmlFor="">Brand name:</label>
                    <input type="text" className='form-control' value={brand} onChange={(event) => setBrand(event.target.value)} />

                    <label htmlFor="">modelno:</label>
                    <input type="text" className='form-control' value={modelno} onChange={(event) => setModelno(event.target.value)} />


                    <label htmlFor="">price:</label>
                    <input type="text" className='form-control' value={price} onChange={(event) => setPrice(event.target.value)} /> <br />

                   
                    <br />

                    <input type="submit" className='form-control btn btn-info' onClick={(event) => submitHandle(event)} />

                </form>

            </div>

        </div>
    )
}

export default Laptopadd