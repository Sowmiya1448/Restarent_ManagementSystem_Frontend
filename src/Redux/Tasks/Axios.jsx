import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Table.css'

const Axios = () => {
    const[apidata,setApidata]=useState([])

    useEffect(()=>{

        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(Response=>setApidata(Response.data))
        .catch(error=>console.log(error))

         },[])

         useEffect(()=>{
            console.log(apidata,"api")
         },[apidata])

         let result=apidata.map((data,index)=>{
            return(
                    <tr key={index}>
                     <td> {data.userId} </td>
                     <td>{data.id}</td>
                     <td> {data.title}</td>
                   </tr>
            )
         })
       
       
        
return (
    <div>
    
    <table  className="table table-bordered">
    <thead>
        <tr>
        
        <th>UserId</th>
        <th>Id</th>
        <th>Title</th>
        </tr>
    </thead>
    <tbody>
        {result}
    </tbody>
</table>
 </div>
  )
}

export default Axios