import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const LaptopUpdate = () => {

    const navigate = useNavigate()

    const params = useParams()

    const { id } = params

    const [brand, setBrand] = useState('')

    const [modelno, setModelno] = useState('')

    const [price, setPrice] = useState('')

    const [category, setCategory] = useState([])

    const [cateid, setCateid] = useState([])

    const [stock,setStock] = useState('')

    const[stocklist,setStocklist] = useState([])

   useEffect(() =>{

        axios.get('http://127.0.0.1:8001/stock/all')
        .then(response =>{
            console.log(response.data,"stock")
            setStocklist(response.data)
        })
        .catch(error =>console.log(error))

     },[])



   const submitHandle = (event) => {

       event.preventDefault()

       const data = {
            brandname: brand,
            modelno: modelno,
            price: price,
            category_ref: cateid

        }

        axios.patch(`http://127.0.0.1:8001/laptop/update/${id}/`, data)
            .then(response => {
                    console.log(response.data)
                    navigate('/laptop/')
             })  
                
            .catch(error =>console.log(error))  

}


    useEffect(() => {

        axios.get('http://127.0.0.1:8001/category/all/')
            .then(response => {

                setCategory(response.data)
            })
            .catch(error => console.log(error));
}, [])



    useEffect(() => {
        console.log(cateid,"cateid")
    }, [cateid])

    useEffect(() => {
        axios.get(`http://127.0.0.1:8001/laptop/${id}`)
            .then(response => {

                setBrand(response.data.brandname)
                setModelno(response.data.modelno)
                setPrice(response.data.price)
                setCateid(response.data.category_ref)
                setStock(response.data.stock)


            })
            .catch(error => console.log(error))

    }, [])

    const categorys = category.map((cat, index) => {

        return (

            <option key={index} value={cat._id}>{cat.categoryname}</option>
        )
    })


    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Laptop Update</h2>

            <div className='container-fluid'>
                <button className='btn  btn-info float-end' onClick={() => navigate('/laptop/')}>
                    Back
                </button> <br /> <br />
            </div>

            <div className='container-fluid' style={{ width: '30%', alignItems: 'center' }}>
                <form action="" >

                    <label htmlFor="">Brand name:</label>
                    <input type="text" className='form-control' value={brand} onChange={(event) => setBrand(event.target.value)} />

                    <label htmlFor="">modelno:</label>
                    <input type="text" className='form-control' value={modelno} onChange={(event) => setModelno(event.target.value)} />


                    <label htmlFor="">price:</label>
                    <input type="text" className='form-control' value={price} onChange={(event) => setPrice(event.target.value)} /> <br />

                    <label>category:  </label>
                    <select value={cateid} onChange={event => setCateid(event.target.value)}>
                        <option value="" >select a category</option>
                        {categorys}
                    </select> <br />

                 
                    <br /> <br />

                    <input type="submit" className='form-control btn btn-info' onClick={(event) => submitHandle(event)} />

                </form>

            </div>


        </div>
    )
}

export default LaptopUpdate