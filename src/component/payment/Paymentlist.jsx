import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Paymentlist = () => {


    const navigate = useNavigate()

    const [dealer, setDealer] = useState([])
    const [bill, setBill] = useState([])
    const [pay, setPay] = useState([])

    useEffect(() => {


        axios.get("http://127.0.0.1:8001/customer/all")
            .then(response => {
                // console.log(response.data,"dealer")
                setDealer(response.data)
            })
            .catch(error => console.log(error));

        axios.get("http://127.0.0.1:8001/bill/all")
            .then(response => {
                // console.log(response.data,"bill")
                setBill(response.data)
            })
            .catch(error => console.log(error));

        axios.get("http://127.0.0.1:8001/payment/all")
            .then(response => {
                // console.log(response.data,"pay")
                setPay(response.data)
            })
            .catch(error => console.log(error));

    }, [])



    let result = dealer.length > 0 ? dealer.map((data, index) => {

        let totalpurchase = 0

        for (let bills of bill) {

            if (bills.bill_data.customer_ref === data._id) totalpurchase += bills.bill_data.bill_amount

        }

        let pay_data = pay.length > 0 && pay.find(pays => pays.customer_ref === data._id)

         return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.customername}</td>
                <td>{totalpurchase}</td>
                <td><button className='btn btn-danger' onClick={() => navigate(`/pay/${data._id}`)}>pay</button></td>
                <td>{pay_data && pay_data.paid}</td>
                <td>{pay_data && pay_data.Balance}</td>
                <td><button className="btn btn-outline-info" onClick={() => navigate(`/payupdate/${data._id}`)}>Update</button></td>


            </tr>
        )

    }) : <tr>
        <td>NO DATA FOUND</td>
    </tr>


    return (
        <div>


            <h2 className='text-center'>Payment</h2> <br /> <br />

            <div className='container-fluid'>
                <table className='table table-bordered text-center'>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Dealer</th>
                            <th>Total purchase</th>
                            <th>pay</th>
                            <th>paid</th>
                            <th>Balance</th>
                            <th>Update</th>

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

export default Paymentlist