import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const Paybillview = () => {

    
    const navigate = useNavigate()

    const param = useParams()

    const [bill, setBill] = useState([])
    const [item, setItem] = useState([])
    const [menu, setMenu] = useState([])
   
    const[date,setDate] = useState("")
    const { id } = param

  


    useEffect(() => {

        axios.get(`http://127.0.0.1:5000/paidbills/${id}/`)
            .then(response => {

                console.log(response.data,"items")
                setBill(response.data.bill_data)
                setItem(response.data.items_data)
                setDate((response.data.bill_data.billdate).slice(0,10))
              
            })
            .catch(error => console.log(error))

        axios.get("http://127.0.0.1:5000/menu/all/")
            .then(response => {
                setMenu(response.data)
            })
            .catch(error => console.log(error))


    }, [])

    let result = item.length > 0 ? item.map((data, index) => {

        let menuitem = menu.find(menus => menus._id === data.item_ref)
    

        return (
            <tr key={data._id}>
                <td>{index + 1}</td>
                <td>{menuitem && menuitem.itemname}</td>
                <td>{data.price}</td>
                <td>{data.quantity}</td>
                <td>{data.amount}</td>
                <td>{data.gst}</td>
                <td>{data.gstamount}</td>
                <td>{data.subtotal}</td>
            </tr>

        )


    }) : <tr>
        <td colSpan={15}>NO DATA FOUND</td>
    </tr>

  return (

    <div style={{paddingLeft:"20rem"}}>
        
        <h2 className='text-center head'>Paybillview</h2>



    
       <div className='container-fluid'>
                <button className='btn btn-info float-end' onClick={() => navigate('/allbills/')}>Back</button> <br />
            </div> <br /> <br />

            <div>

                <div style={{fontWeight:"bold",display:'flex',justifyContent:"space-evenly",alignItems:"center",flex:"wrap"}}>

                   <h5> Billno : {bill.Billno}</h5>
                   <h5> Date : {date}</h5>
                   <h5> BillAmount :&nbsp;<span style={{color:"red"}}>{Math.round(bill.billamount)}</span></h5>
                </div> <br />

                <div className='container-fluid'style={{ width:"80%" }}>

                    <table className='table table-bordered text-center'>
                        <thead>
                            <tr> 
                                <th>S.no</th>
                                <th>Itemname</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>amount</th>
                                <th>Gst</th>
                                <th>GstAmount</th>
                                <th>subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result}
                        </tbody>
                    </table>
                </div>
            </div>
    
    
    </div>
  )
}

export default Paybillview