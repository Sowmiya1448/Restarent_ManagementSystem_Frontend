import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ImageDisplay from '../imageUpload/ImageDisplay'

const Addmenu = () => {

    const navigate = useNavigate()

    const[itemname,setItemname] = useState('')
    const[price,setPrice] = useState('')
    const[foodcato,setFoodcato] = useState("")
    const[category,setCategory] = useState([])


    const [base64String, setBase64String] = useState('')
    const [image_source, setImageSource] = useState('')

    const handleImageChange = event => {

        const file = event.target.files[0]

        const reader = new FileReader()

        reader.onloadend = () => {

            const base64 = reader.result

            setBase64String(base64)
        }

        reader.readAsDataURL(file)
    }

   

     
    const submitHandle = (event) => {

        event.preventDefault()

        const data ={
            
            itemname:itemname,

            price:price,
     
            image:base64String,
            
            category_ref:foodcato
        }
        
        axios.post("http://127.0.0.1:5000/menu/add/",data)
        .then(response => {
          
            setImageSource(response.data.image,"data recieved")
            navigate('/menu/')
        })
        .catch(error => console.log(error))

}


    useEffect(() =>{

        axios.get("http://127.0.0.1:5000/foodcategory/all")
        .then(response => {
            console.log(response.data,"foodcategory")
            setCategory(response.data)
        })
        .catch(error =>console.log(error))
},[])





let cato = category.length>0 && category.map((data,index) =>{
    return(

        <option key={index} value={data._id}>{data.categoryname}</option>
    )
})

  return (


    <div style={{paddingLeft:"20rem"}}>
        
        <h2 className='text-center head'>Add Menu Items</h2> <br />

        <div className='container-fluid'>
            <button className='btn btn-secondary float-end' onClick={() =>navigate('/menu/')}>Back</button>
        </div>

        <div className='container-fluid'>
                 <form action="" style={{ width: "50%", marginLeft: "25%" }}>

                     <label htmlFor="">Item Name: </label>
                     <input type="text" placeholder='Enter the item name' className='form-control' value={itemname} onChange={event=>setItemname(event.target.value)}/>

                     <label>Category :</label>
                     <select  className='form-control' onChange={event =>setFoodcato(event.target.value)}>
                        <option value="">select a option</option>
                        {cato}
                     </select>

                     <label htmlFor="">Price : </label>
                     <input type="text"  className='form-control' value={price} onChange={event=>setPrice(event.target.value)}/> <br />

                   
                    <div>
                        <label>Upload a Image: &nbsp;</label>

                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        
                        <ImageDisplay source={image_source}></ImageDisplay>
                    </div>


                    <br />

                    <input type="submit" className='form-control btn btn-info' onClick={(event) => submitHandle(event)} />

                    </form>

                    </div>
    
    </div>
  )
}

export default Addmenu