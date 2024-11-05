import React, { useEffect, useState } from 'react';
import axios from 'axios'
import check from '../images/check-mark.png'
import chefbg from '../images/chefbg.jpg'
import '../chef/chef.css'
import chefhat from '../images/chef-hat.png'

const Orgchef = () => {
    
    const [chef, setChef] = useState([])
    const [table, setTable] = useState([])
    const [data, setData] = useState({})


useEffect(() => {

        axios.get('http://127.0.0.1:5000/chef/all/')
            .then(response => {

                setChef(response.data)
            })
            .catch(error => console.log(error))

        axios.get("http://127.0.0.1:5000/table/all/")
            .then(response => {

                setTable(response.data)
            })
            .catch(error => console.log(error))
}, [])


    const submitHandle = (data) => {
       
        axios.patch(`http://127.0.0.1:5000/chef/${data._id}`, { status: "Done" })
            .then(response => {
                console.log(response.data)
              
                setChef(chef.map(item =>
                    item._id === data._id ? { ...item, status: "Done" } : item
                ))
            })
            .catch(error => console.log(error))
    }

 
    const result = chef.length > 0 ? chef.map((data, index) => {
        const tab = table.find(tabo => tabo._id === data.table_ref)

        return (
            <tr key={data._id}>
                <td>{index + 1}</td>
                <td>{tab ? tab.tableno : "Take-away"}</td>
                <td>{data.itemname}</td>
                <td>{data.quantity}</td>
                <td>
             <button className='btn btn-outline-warning' data-bs-toggle="modal"  data-bs-target="#staticBackdrop" onClick={() => setData(data)}>
                        Done
             </button>
                </td>
                <td>{data.status === "Done" ? <img src={check} alt="Done" height="30px" width="30px" /> : ""}</td>
            </tr>
        )
    }) : (
        <tr>
            <td colSpan={14}>NO DATA FOUND</td>
        </tr>
    )

    return (

        <div style={{
       
        backgroundImage:`url(${chefbg})`,
        width:"100%",
        height:"150vh",
        backgroundSize:"cover",
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center",
   
      
}}>
            
            <h2 className='text-center head1'><img src={chefhat} alt=""  height={"70px"} width={"70px"}/>Chef  &nbsp; &nbsp; Page</h2>
            <br /> <br />
            <div className='container-fluid' style={{ width: "60%" }}>
                <table className='table transparent-table'>
                    <thead>
                        <tr>
                            <th>s.no</th>
                            <th>Table no</th>
                            <th>Item name</th>
                            <th>Quantity</th>
                            <th>process</th>
                            <th>Status</th>
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
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Confirm Completion</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you've  Done this "&nbsp;<span style={{ color: "red" }}>{data.itemname}</span>&nbsp;" ?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => submitHandle(data)}>Done</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orgchef
