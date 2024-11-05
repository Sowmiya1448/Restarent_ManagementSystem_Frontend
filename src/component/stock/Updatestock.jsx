import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Updatestock = () => {



  const params = useParams()

  const {id} = params

   const navigate = useNavigate()

  const[exstock,setExstock] = useState('')

 

useEffect(() =>{

  axios.get(`http://127.0.0.1:8001/stock/${id}`)
  .then(response =>{
      // console.log(response.data.stocklist,"stockdata in add stock")
      setExstock(response.data.stocklist)
  })
  .catch(error => console.log(error))
},[])


const submithandle = (event) =>{

  event.preventDefault()

  let data = {
      
      stocklist:exstock
  }

  axios.patch(`http://127.0.0.1:8001/stock/${id}`,data)
  .then(response =>{

      console.log(response.data)
      navigate('/stocklist')
      
  })
  .catch(error =>console.log(error))

}


  return (

    
    <div>
      <h2 className='text-center'>Stock update</h2> <br /> <br />


      <div className='container-fluid text-center'>

<label>stock : &nbsp;</label>
<input type="Number"  value={exstock} onChange={event =>setExstock(event.target.value)}/> &nbsp;

<input type="submit"  className='btn btn-info' onClick={event =>submithandle(event)}/>


</div>
    </div>
  )
}

export default Updatestock