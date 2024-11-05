import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const Pay = () => {

   const navigate = useNavigate()

   const params =useParams()

   const {id} = params

  const[billamount,setAmount] = useState("")

  const[paid,setPaid] = useState(0)

  const[balance,setBalance] = useState(0)

  const[bill,setBill] = useState([])

  const[paydata,setPaydata] = useState([])

  const[payid,setPayid] = useState('')


useEffect(() =>{

   axios.get("http://127.0.0.1:8001/bill/all")
    .then(response =>{
      // console.log(response.data,"bill")
      setBill(response.data)
    })
    .catch(error =>console.log(error));

    axios.get("http://127.0.0.1:8001/payment/all")
    .then(response =>{
      // console.log(response.data,"pay")
      setPaydata(response.data)
    })
    .catch(error =>console.log(error));

  },[])

  
    useEffect(() =>{
       
    
      let totalpurchase =0

      for(let bills of bill)
        {
          
          if(bills.bill_data.customer_ref === id)   totalpurchase += bills.bill_data.bill_amount
        
        }
      
        setAmount(totalpurchase)

        
        let pay_record = paydata.find(pay => pay.customer_ref === id);
        if (pay_record) {
          setPayid(pay_record._id);
        }
          
      

      },[bill,paydata,id])

      useEffect(() =>{

         setBalance(Number(billamount) - Number(paid))

        },[paid])

        const submitHandle =(event) =>{

          event.preventDefault()

          const data = {

            Total_purchase:billamount,
            paid:paid,
            Balance:balance,
            customer_ref:id
        }


        axios.patch(`http://127.0.0.1:8001/payment/${payid}`,data)
        .then(response => {
          console.log(response.data)

          navigate('/payment/')
        })
        .catch(error =>console.log(error))

          }
  

return (
    <div>
      
      <h2 className='text-center'> Pay</h2> <br /><br />

      <div className='container-fluid' style={{width:"30%"}}>
         <label htmlFor="">Total purchase Amount: </label>
          <input type="number" className='form-control'  value={billamount}  onChange={event =>event.target.value}/> 

          <label htmlFor="">paid: </label> 
          <input type="number" className='form-control' value={paid} onChange={event =>setPaid(event.target.value)} /> 

          <label htmlFor="">Balance : </label>
          <input type="number" className='form-control' value={balance} onChange={event =>setBalance(event.target.value)} /> <br /> <br /> 

          <input type="submit" className='btn btn-info form-control' onClick={event =>submitHandle(event)} />
      </div>

</div>
  )
}

export default Pay