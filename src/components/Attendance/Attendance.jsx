import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Attendance = () => {

    const [date, setDate] = useState('');
    const [employee, setEmployee] = useState([]);
    const [attendance, setAttendance] = useState({}); 
    const[show,setShow] = useState(false)

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/employee/all")
            .then(response => {
                setEmployee(response.data);
            })
            .catch(error => console.log(error));
    }, []);



    const AttendanceChange = (empId, status) => {
        setAttendance(prevState => ({
            ...prevState,
            [empId]: status 
        }));
    };

    

    const submitAll = () => {

        if (!date) {
            setShow(true)
            alert("Please select a date before submitting");
            return;
        }

        for (let emp of employee) {
            
            const data = {
                employeeID: emp._id,
                date: date,
                status: attendance[emp._id] 
            }

          

            axios.post("http://127.0.0.1:5000/attendance/add/", data)
                .then(response => {
                    console.log(response.data);
                    
                    setAttendance('')
                    
                })
                .catch(error => console.log(error));
        }
    }


    const result = employee.length > 0 ? employee.map((data, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.empid}</td>
                <td><img src={data.image} alt="" width={"70px"} height={"70px"} /></td>
                <td>{data.empname}</td>
                <td>
                    <input 
                        type="checkbox" 
                        checked={attendance[data._id] === 'present'} 
                        onChange={() => AttendanceChange(data._id, 'present')}
                    />
                </td>
                <td>
                    <input 
                        type="checkbox" 
                        checked={attendance[data._id] === 'absent'} 
                        onChange={() => AttendanceChange(data._id, 'absent')}
                    />
                </td>
            </tr>
        );
    }) : (
        <tr>
            <td colSpan={6}>NO DATA FOUND</td>
        </tr>
    );

    return (
        <div style={{paddingLeft:"20rem"}}>
            
            <h2 className='text-center head'>Attendance</h2>
            <br /><br />
            <div className='container-fluid' style={{marginLeft:"25%"}}>
                <label>Date: </label>
                <input type="date" value={date} onChange={event => setDate(event.target.value)} style={{ border: "2px solid black" }} />
                <br /><br />
            </div>

            <div className='container-fluid' style={{width:"50%"}}>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>EmpID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Present</th>
                            <th>Absent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result}
                    </tbody>
                </table>
            </div>

            <div className='container-fluid' style={{marginLeft:"65%"}}>
                <button className='btn btn-outline-info' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={submitAll}>Submit All</button>
            </div>


        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Attendance</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                Data stored Successfully !
            </div>
            
            <div className="modal-footer">

                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" >cancel</button> 
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal"  >ok</button>
            </div>  
            </div>
        </div>
        </div>




        </div>
    );
}

export default Attendance