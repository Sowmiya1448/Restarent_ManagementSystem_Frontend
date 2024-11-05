import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Bill_list = () => {

    const navigate = useNavigate()
    const [billdata, setData] = useState([])
    const [del, setDel] = useState([])
    const [customer_list, setClist] = useState([])
  
    useEffect(() => {

        axios.get('http://127.0.0.1:8001/bill/all/')
            .then(response => {
                console.log(response.data)
                setData(response.data)
            })
            .catch(error => console.log(error))

        axios.get("http://127.0.0.1:8001/customer/all")
            .then(response => {
                // console.log(response.data, "cus_list")
                setClist(response.data)
            })
            .catch(error => console.log(error))

        }, [])

    const deletehandle = () => {

        axios.delete(`http://127.0.0.1:8001/bill/${del._id}/`)
            .then(response => {
                // console.log(response.data)

                let duplicate = [...billdata]
                duplicate.splice(billdata.findIndex(b => b.bill_data._id === del._id), 1)
                setData(duplicate)

            })
            .catch(error => console.log(error));

    }


    let result = billdata.length > 0 ? billdata.map((data, index) => {


        let dealer = customer_list.find(cus => cus._id === data.bill_data.customer_ref)


   return (
            <tr key={data.bill_data._id}>
                <td>{index + 1}</td>
                <td>{data.bill_data.billno}</td>
                <td>{(data.bill_data.bill_date).slice(0, 10)}</td>
                <td>{dealer ? dealer.customername : " - "} </td>
                <td>{data.bill_data.bill_amount}</td>

                <td>{(data.bill_data.bill_status === "Paid")? ( <p style={{color:"green", fontWeight:"bold" ,border:"2px solid green"}}>{data.bill_data.bill_status}</p>) :
                 (data.bill_data.bill_status === "unpaid")? (<p style={{color:"red",fontWeight:"bold",border:"2px solid red"}}>{data.bill_data.bill_status}</p>) :
                  (<p style={{color:"orange",fontWeight:"bold"}}>{data.bill_data.bill_status}</p>)}</td>

                <td><button className='btn btn-info' onClick={() => navigate(`/view/${data.bill_data._id}/`)}>View</button></td>
                <td><button className='btn btn-secondary' onClick={() => navigate(`/billupdate/${data.bill_data._id}`)} >Update</button></td>
                <td><button className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setDel(data.bill_data)} >Delete</button></td>

            </tr>
        )
    }) : <tr>
        <td colSpan={15}>No Data Found</td>
    </tr>

    return (

        <div>
          
            <h2 className='text-center'>Bill List</h2> <br /> <br />

            <div className='container-fluid'>
                <table style={{ textAlign: 'center', width: "100%" }} className='table table-bordered text-center'>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Bill_no</th>
                            <th>Date</th>
                            <th>Dealer</th>
                            <th>Total_amount</th>
                            <th>Status</th>
                            <th>View</th>
                            <th>Update</th>
                            <th>Delete</th>
                
                        </tr>
                    </thead>

                    <tbody>
                        {result}
                    </tbody>

                </table>

            </div>



            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure do you want to delete {del.billno} ?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={deletehandle}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Bill_list