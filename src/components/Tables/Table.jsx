import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import del from '../images/trash-can.png'
import edit from '../images/edit.png'

const Table = () => {

    const navigate =useNavigate()
    const[tabledata,setTabledata] = useState([])
    const[tabdel,setTabdel] = useState([])

    useEffect(() =>{

        axios.get("http://127.0.0.1:5000/table/all")
        .then(response =>{
        
            setTabledata(response.data)
        })
        .catch(error =>console.log(error))
    },[])

    let result = tabledata.length>0 ? tabledata.map((data,index) =>{
        return(
            <tr key={data._id}>
                <td>{index+1}</td>
                <td>{data.tableno}</td>
                <td>{data.chairs}</td>
                
                {/* <td>{(data.status ==="Available") ? <p style={{color:"green", border:"1px solid green"}}>{data.status}</p>:
                <p style={{color:"red" ,border:"2px solid red"}}>{data.status}</p>}</td>  */}

                <td><button className='btn' onClick={() => navigate(`/updatetable/${data._id}/`)}><img src={edit} height={"30px"} width={"30px"} /></button></td>
                <td><button className='btn' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() =>setTabdel(data)}><img src={del} height={"30px"} width={"30px"}/></button></td>
            </tr>

        )
    }): <tr>
        <td colSpan={8}>NO DATA FOUND</td>
    </tr>


const deletehandle = () =>{

    axios.delete(`http://127.0.0.1:5000/table/${tabdel._id}`)
    .then(response =>{
        console.log(response.data)

        let duplicate = [...tabledata]
        duplicate.splice(tabledata.findIndex(e =>e._id === tabdel._id),1)
        setTabledata(duplicate)

     })
    .catch(error =>console.log(error))
}


  return (

    <div style={{paddingLeft:"20rem"}}>
        
        <h2 className='text-center head'>Tables</h2>
         <br /> <br />
         <div className='container-fluid' style={{marginLeft:"70%"}}>
            <button className='btn btn-outline-info' onClick={() => navigate('/addtable/')}>+Add</button>
         </div> <br />

         <div className='container-fluid' style={{width:"60%"}}>

            <table className='table table-bordered text-center'>
                <thead>
                    <tr>
                         <th>S.no</th>
                        <th>Tableno</th>
                        <th>Chairs</th>
                        {/* <th>Status</th> */}
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
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Delete</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete {tabdel.tableno}?</p>

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

export default Table