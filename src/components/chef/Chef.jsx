import React, { useEffect ,useState} from 'react'
import axios from 'axios'
import check from '../images/check-mark.png'


const Chef = () => {


    const[chef,setChef] = useState([])
    const[table,setTable] = useState([])

    const[del,setDell] = useState([])

    useEffect(() =>{

         axios.get('http://127.0.0.1:5000/chef/all/')
        .then(response =>{
           
            setChef(response.data)
        })
        .catch(error =>console.log(error))

        axios.get("http://127.0.0.1:5000/table/all/")

        .then(response =>{
            
            setTable(response.data)
        })
        .catch(error =>console.log(error))
},[])

let result = chef.length > 0 ? chef.map((data,index) =>{

    let tab = table.find(tabo => tabo._id === data.table_ref)
 
   
    return(
        
        <tr key={data._id}>
            <td>{index+1}</td>
            <td>{tab ? tab.tableno:"Take-away"}</td>
            <td>{data.itemname}</td>
            <td>{data.quantity}</td>
            <td>{(data.status === "Pending") ? <p style={{color:"red"}}>{data.status}</p>:<p style={{color:"green"}}> <img src={check} alt="" height={"30px"} width={"30px"} /></p>}</td>

            <td><button className='btn btn-outline-danger' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>setDell(data)}>X</button></td>
        </tr>


    )
}) : <tr>
    <td colSpan={14}>NO DATA FOUND</td>
</tr>


const deleteHandle =(del) =>{


    axios.delete(`http://127.0.0.1:5000/chef/${del._id}`)

    .then(response =>{
        console.log(response.data)

        const dup = [...chef]
        dup.splice(chef.findIndex(c =>c._id === del._id),1)
        setChef(dup)

    })
    .catch(error =>console.log(error))

}




  return (


    <div style={{paddingLeft:"20rem"}}>
        
        <h2 className='text-center head'>Chef</h2> <br />

        <div className='container-fluid' style={{width:"80%"}}>
            <table className='table'>
                <thead>
                    <tr>
                        <th>s.no</th>
                        <th>Table no</th>
                        <th>Item name</th>
                        <th>Quantity</th>
                        <th>Status</th>
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
                            <p>Are you sure you want to delete " {(del.status === "Done") ? <span style={{color:"green"}}>{del.status}</span>: <span style={{color:"red"}}>{del.status}</span>} " ?</p>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={()=>deleteHandle(del)} >delete</button>
                        </div>
                    </div>
                </div>
            </div>



    </div>
  )
}

export default Chef