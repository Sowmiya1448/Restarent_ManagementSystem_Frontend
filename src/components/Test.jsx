import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Attendance = () => {

    const[date,setDate] = useState('')
    const[employee,setEmployee] = useState([])
    const[attendance,setAttendance] = useState('')


    useEffect(() =>{


        axios.get("http://127.0.0.1:5000/employee/all")
        .then(response =>{
            console.log(response.data)
            setEmployee(response.data)
        })


    },[])

   let result = employee.length >0 ?employee.map((data,index) =>{

   return(
           <tr key={index}>
            <td>{index+1}</td>
            <td>{data.empid}</td>
            <td><img src={data.image} alt="" width={"70px"} height={"70px"} /></td>
            <td>{data.empname}</td>
            <td><input type="checkbox"  value="present"   onChange={event =>setAttendance(event.target.value)}/></td>
            <td><input type="checkbox"  value="absent"  onChange={event =>setAttendance(event.target.value)}/></td>
            {/* <td><input type="submit"   className='btn btn-outline-info' onClick={() =>submithandle(data._id)}/></td> */}
      </tr>
        )
    }): <tr>
        <td colSpan={15}>
            NO DATA FOUND
        </td>
    </tr>

//     const submithandle =(_id) =>{

//         if(!date){
//             alert("please select a data before submitting")
//             return
//           }

//         const data ={

//         employeeID:_id,
//         date:date,
//         status:attendance
//         }

//         axios.post("http://127.0.0.1:5000/attendance/add/",data)
//         .then(response =>{
//             console.log(response.data)
//         })
//         .catch(error =>console.log(error))
     
// }


const submitall =() =>{

    for(let emp of employee)
    {

        if (!date) {
            alert("Please select a date before submitting");
            return;
        }

        const data = {
            employeeID:emp._id,
            date: date,
            status: attendance
        }

        axios.post("http://127.0.0.1:5000/attendance/add/", data)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))

    }
}
 

  return (

    <div>
        <h2 className='text-center'>Attendance</h2>

        <div className='container-fluid'>

            <label>Date : </label>
            <input type="date" value={date} onChange={event =>setDate(event.target.value)} style={{ border: "2px solid black" }}/>
             <br /> <br />
        </div>

        <div className='container-fluid'>
                
           <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>S.no</th>
                    <th>EmpID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>present</th>
                    <th>Absent</th>
                    {/* <th>Sumbit</th> */}
                </tr>
            </thead>
            <tbody>
                {result}
            </tbody>
           </table>
        </div>

          <div className='container-fluid'>
                <button className='btn btn-outline-info float-end' onClick={submitall}>Submit All</button>
            </div>
       
         


    </div>
  )
}

export default Attendance




//   **** home.css****

// @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');

// *{
//     font-family: "Nunito", sans-serif;
//     margin: 0%;
//     padding:0;
//     box-sizing: border-box;
//     border: none;
// }
// :root{

//     --fontsize:20px;
// }

// ::selection{
//     background:orange;
//     color:purple;
// }

// /* body{
    
//     background-color:white;
//     overflow-x:hidden;
//     padding-left:20rem;
// } */
// nav ul li{ 

//     list-style: none;
//     color:white;
//     font-weight: bolder;
//     padding:0.5rem 3rem;
// }

// nav ul li:hover{
  
//     color:orange;
//     background-color:white;
//     font-weight: bolder;
//     border-radius: 25px;
// }

//     header{

//     font-size:var(--fontsize);
//      position: fixed;
//      top: 0%;
//      left: 0%;
//      z-index: 1000; 
//      height: 100%;
//      width:fit-content;
//      padding-right: 30px;
//      background-color:orange;
//      display: flex;
//      flex-wrap: wrap;
//      align-items: center;
//      justify-content: center;
//      flex-flow:column;
//      text-align: center; 
//     }

// .log{

//     width:100%;
//     height:60px;
//     background-color: bisque;
//     margin-bottom: 20px;
//     display: flex;
//     padding: 10px;

// }

// .log .text{

//     margin-left: 10rem;
//     padding: 10px 0;
//     color:orange;
//     font-weight: bold;

// }

// .log button{
   
//     position: absolute;
//     padding: 10px 20px;
//     right: 20px;
//     border-radius:10px;
// }


