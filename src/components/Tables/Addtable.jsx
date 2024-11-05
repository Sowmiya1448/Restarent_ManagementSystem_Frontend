import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Addtable = () => {

    const navigate = useNavigate()
    
    const[tabno,setTabno] = useState('')
    const[chair,setChair] = useState('')

    const submitHandle =(event) => {

      event.preventDefault()

      const data ={
             
             tableno:tabno,
            chairs:chair,
                }

      axios.post("http://127.0.0.1:5000/table/add",data)
      .then(response =>{
        console.log(response.data)
        navigate('/table/')
      })
      .catch(error =>console.log(error))


    }

return (
  
    <div style={{paddingLeft:"20rem"}}>

        <h2 className='text-center head'>Add Tables</h2> <br /> <br />

        <div className='container-fluid'>
                <button className='btn btn-info float-end' onClick={() => navigate('/table/')}>Back</button> <br />
            </div> <br /> <br />

            <div className='container-fluid' style={{width:"30%"}}>
              <form className='form-control'>
                <label>Tableno:</label>
                <input type="Number"  className='form-control' value={tabno} onChange={e =>setTabno(e.target.value)}/>

                <label>chairs:</label>
                <input type="Number"  className='form-control'  value={chair} onChange={e =>setChair(e.target.value)}/> <br /> <br />

                <input type="submit" className='btn btn-info form-control'  onClick={(event)=>submitHandle(event)}/>

          
              </form>

            </div>
    </div>
  )
}

export default Addtable