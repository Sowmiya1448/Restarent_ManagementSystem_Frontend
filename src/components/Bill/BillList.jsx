import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BillList = () => {

    const navigate = useNavigate()

    const[billdata,setBilldata] = useState([])

    const[table,setTable] = useState([])

    const[billdel,setBilldel] = useState([])

    const [searchTerm, setSearchTerm] = useState("")

    const handleSearch = (event) => {

        setSearchTerm(event.target.value)

    }

 
useEffect(() =>{

        axios.get("http://127.0.0.1:5000/order/all/")
        .then(response =>{

            setBilldata(response.data)
            
        })
        .catch(error =>console.log(error))

        axios.get("http://127.0.0.1:5000/table/all/")
        .then(response =>{
                setTable(response.data)
            
        })
        .catch(error =>console.log(error))

},[])


let result = billdata.length>0 ? billdata.filter(bills =>bills.bill_data.Billno.toLowerCase().includes(searchTerm.toLowerCase())).map((data,index) =>{

    let tabo = table.find(tab =>tab._id === data.bill_data.table_ref)
   
    return(

        <tr key={index}>
            <td>{index+1}</td>
            <td>{tabo ? tabo.tableno:"Take-away"}</td>
            <td>{data.bill_data.Billno}</td>
            <td>{data.bill_data.billdate &&(data.bill_data.billdate).slice(0,10)}</td>
            <td>{Math.round(data.bill_data.billamount)}</td>

            <td>{(data.bill_data.billstatus === "UNPAID")?<p style={{color:'red',border:"1px solid red",padding:"3px",fontWeight:"bold",textAlign:"center"}}>{data.bill_data.billstatus}</p>:
            <p style={{color:'green',border:"1px solid green",padding:"3px",fontWeight:"bold",textAlign:"center"}}>{data.bill_data.billstatus}</p>} </td>

            <td><button className='btn btn-outline-info' onClick={() =>navigate(`/billview/${data.bill_data._id}`)}>View</button></td>
            <td><button className='btn btn-warning' onClick={() =>navigate(`/billupdate/${data.bill_data._id}`)}>update</button></td>
            <td><button className='btn btn-danger'  data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() =>setBilldel(data.bill_data)}>X</button></td>
        </tr>

    )
}): <tr>
    <td colSpan={10}>NO DATA FOUND</td>
</tr>

const deletehandle = () =>{

    axios.delete(`http://127.0.0.1:5000/order/${billdel._id}`)
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
        <h2 className='text-center head'>Bill List</h2> <br />

        <div style={{marginLeft:"250px"}}>

           <label htmlFor="">Search : &nbsp;</label>

            <input type="text" placeholder="Billno" value={searchTerm} onChange={handleSearch}

            style={{ border: "2px solid black", borderRadius: "5px" }} /> &nbsp;

        </div> <br />

        <div className='container-fluid' style={{width:"60%"}}>

            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Table</th>
                        <th>Billno</th>
                        <th>Date</th>
                        <th>Billamount</th>
                        <th>Status</th>
                        <th>view</th>
                        <th>update</th>
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

export default BillList