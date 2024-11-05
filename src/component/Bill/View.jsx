import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const View = () => {

    const navigate = useNavigate()

    const params = useParams()

    const { id } = params

    const [billdata, setBilldata] = useState({

        billno: '',
        bill_date: '',
        bill_amount: ''

    })
    const [productdata, setBillproduct] = useState([])
    const [grand_total, setGrand] = useState([])
    const [lapid, setLapid] = useState([])
    const[customer_id,setCustomerid] = useState('')
    const[customer_data,setCustomerdata] = useState([])


    useEffect(() => {

        axios.get(`http://127.0.0.1:8001/bill/${id}`)

            .then(response => {

                // console.log(response.data.product_data,"product")

                // console.log(response.data.bill_data)

                setBilldata(response.data.bill_data)
                
                setBillproduct(response.data.product_data)
                setGrand(response.data.bill_data.bill_amount)
                setCustomerid(response.data.bill_data.customer_ref)
            })
            .catch(error => console.log(error))

         axios.get(`http://127.0.0.1:8001/laptop/all`)

            .then(response => {

                // console.log(response.data, "laptopdata")
                setLapid(response.data)
            })

            .catch(error => console.log(error))

    }, [])


    useEffect(() =>{

    if (customer_id.length > 0) {

            
            axios.get(`http://127.0.0.1:8001/customer/${customer_id}`)
    
            .then(response => {
    
                // console.log(response.data, "customer")
                setCustomerdata(response.data)

                
            })
    
            .catch(error => console.log(error))
        }



    },[customer_id])


let result = productdata.map((data, index) => {

        let laptop = lapid.find(lap => lap._id === data.laptop_reference)

        return (

            <tr key={index}>

                <td>{index + 1}</td>

                <td>{laptop.brandname}</td>
                <td>{data.quantity}</td>
                <td>{laptop.price}</td>
                <td>{data.amount}</td>
                <td>{data.gst}</td>
                <td>{data.gst_amount}</td>
                <td>{data.sub_total}</td>

            </tr>


        )
    })

    return (

        <div>
            <h2 className='text-center'>Bill View</h2> <br />

            <div className='container-fluid'>
                <button className='btn btn-secondary float-end' onClick={() => navigate('/bill_list')}>
                    Back
                </button> <br /> <br />
            </div>

            <div className='container-fluid' style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>

                <h4>Bill no: {billdata.billno} </h4>
                <h4> Date: {(billdata.bill_date).slice(0, 10)} </h4>
                <h4>Bill Amount: {billdata.bill_amount}</h4> 
                <h4>Dealer:{customer_data.customername}</h4><br /> <br />

            </div>

            <div className='container-fluid'>
                <table className='table table-bordered text-center' style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Laptop</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>amount</th>
                            <th>gst</th>
                            <th>gst_amount</th>
                            <th>subTotal</th>

                        </tr>
                    </thead>

                    <tbody>
                        {result}
                    </tbody>
                </table>
                <h5 className='float-end'>Grand total = ${grand_total}</h5>
            </div>

        </div>
    )
}

export default View