import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const Paybill = () => {

    const navigate =useNavigate()



    const [billdata, setBilldata] = useState([])

    const [searchTerm, setSearchTerm] = useState("")

    const[billdel,setBilldel] = useState([])

    const handleSearch = (event) => {

        setSearchTerm(event.target.value)

    }

useEffect(() => {

        axios.get("http://127.0.0.1:5000/paidbills/all/")
            .then(response => {

                setBilldata(response.data)
                console.log(response.data,"paybills")
               
            })
            .catch(error => console.log(error))

     
    }, [])


    let result =  billdata.filter(bills =>bills.bill_data.billdate.toLowerCase().includes(searchTerm.toLowerCase())).map((data,index) =>{

    return( 
             <tr key={index}>
                <td>{index+1}</td>
                <td>{data.bill_data.Billno}</td>
                <td>{(data.bill_data.billdate) ?(data.bill_data.billdate).slice(0,10) :"-" }</td>
                <td>{Math.round(data.bill_data.billamount)}</td>
                <td>{(data.bill_data.billstatus)&& <p style={{color:"green",border:"1px solid green",textAlign:"center",fontWeight:"bold",padding:"2px"}}>
                    {data.bill_data.billstatus}</p>}</td>
                    <td><button className='btn btn-warning' onClick={()=>navigate(`/paidbillview/${data.bill_data._id}`)}>view</button></td>
                    <td><button className='btn btn-danger'  data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() =>setBilldel(data.bill_data)}>X</button></td>
             </tr>
              )
    })

    const deletehandle = () =>{

        axios.delete(`http://127.0.0.1:5000/paidbills/${billdel._id}`)
        .then(response =>{
            console.log(response.data)
    
            let duplicate = [...billdata]
            duplicate.splice(billdata.findIndex(e =>e.bill_data._id === billdel._id),1)
            setBilldata(duplicate)
    
         })
        .catch(error =>console.log(error))
    }

    return (

        <div style={{paddingLeft:"20rem"}}>

            <h2 className='text-center head'>All Bills</h2> <br /> <br />

            <div style={{ marginLeft: "250px" }}>

                <label htmlFor="">date : &nbsp;</label>

                <input type="text" placeholder="search Bill_date" value={searchTerm} onChange={handleSearch}

                    style={{ border: "2px solid black", borderRadius: "5px" }} /> &nbsp;

            </div> <br />

            <div className='container-fluid' style={{ width: "60%" }}>

                <table className='table table-bordered text-center'>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Billno</th>
                            <th>Date</th>
                            <th>Billamount</th>
                            <th>Status</th>
                            <th>view</th>
                            <th>X</th>

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
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Delete</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete {billdel.Billno}?</p>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={deletehandle} >delete</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Paybill