import React, { Children, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const CategoryView = () => {

    const navigate = useNavigate()

    const params =useParams()

    const {id} = params

    const[menu,setMenu] =useState([])

    const[cato,setCato] = useState('')
 

    useEffect(() =>{

        axios.get("http://127.0.0.1:5000/menu/all")
        .then(response =>{
            console.log(response.data,"menu")
            setMenu(response.data)
        })
        .catch(error =>console.log(error))

        axios.get(`http://127.0.0.1:5000/foodcategory/${id}`)
        .then(response =>{
            setCato(response.data.categoryname)
        })
        .catch(error =>console.log(error))



    },[])


    let result =menu.length>0 ?menu.map((data,index) =>{
      
        if(data.category_ref === id) {

          

        return(
            <tr key={data._id}>
               
                <td><img src={data.image} alt="" width={"70px"} height={"70px"}/></td>
                <td>{data.itemname}</td>
                <td>{data.price}</td>
            </tr>
        )
       }

     }): <tr>
        <td colSpan={8}>
            NO DATA FOUND
        </td>
        </tr>



  return (

    <div style={{paddingLeft:"20rem"}}>
        <h2 className='text-center head'>{cato}</h2> <br /> <br />

        <div className='container-fluid'>
            <button className='btn btn-secondary float-end' onClick={() =>navigate('/foodcategory/')}>Back</button>
        </div>
        <br /> <br />

        <div className='container-fluid' style={{width:"70%"}}>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                    
                    <th>Image</th>
                    <th>Itemname</th>
                    <th>Price</th>
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

export default CategoryView