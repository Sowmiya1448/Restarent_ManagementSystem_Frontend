import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Salary = () => {
  
    const [employee, setEmployee] = useState([])
    const [salary, setSalary] = useState([])
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')

    useEffect(() => {

        axios.get("http://127.0.0.1:5000/employee/all")
            .then(response => {

                setEmployee(response.data)
            })
            .catch(error => console.log(error))

        axios.get("http://127.0.0.1:5000/salary/all")
            .then(response => {

                setSalary(response.data)
                console.log(response.data,"all salary")
            })
            .catch(error => console.log(error))

    }, [])

    const submithandle = (event) => {

        event.preventDefault()

        if (!month || !year) {
            alert("Please select both month and year")
            return
        }


        axios.post("http://127.0.0.1:5000/salary/monthly_salary/", { month, year })
            .then(response => {

                console.log(response.data,"salary")

                axios.get("http://127.0.0.1:5000/salary/all")

                    .then(response => setSalary(response.data))
                    .catch(error => console.log(error))

              
            })
            .catch(error => console.log(error))
    }



    const result = employee.length > 0 ? employee.map((data, index) => {

        const sal = salary.find(salry => salry.emp_ref === data._id)
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.empid}</td>
                <td>{data.empname}</td>
                <td>{sal ? sal.monthlyPresentDays : 0}</td>
                <td>{sal ? sal.monthlysalary :0}</td>
            </tr>
        )

    }) : (
        <tr>
            <td colSpan={6}>NO DATA FOUND</td>
        </tr>
    )

    return (

        <div style={{paddingLeft:"20rem"}}>
            
            <h2 className='text-center head'>Salary</h2>
            <br /><br />

            <div style={{ marginLeft: "15%", width: "50%", display: 'flex', justifyContent: "space-evenly", alignItems: "center" }}>
                <div>
                    <label htmlFor="month">Month: </label>
                    <select id="month" className="form-control" value={month} onChange={(e) => setMonth(e.target.value)}>
                        <option value="">Select Month</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                    <br />
                </div>

                <div>
                    <label htmlFor="year">Year : </label>
                    <input type="number" className='form-control' value={year} placeholder='year' onChange={event => setYear(event.target.value)} />
                    <br />
                </div>

                <button className='btn btn-primary' onClick={submithandle}>Get Attendance</button>
            </div>

            <div className='container-fluid' style={{ width: "70%" }}>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>EmpID</th>
                            <th>Name</th>
                            <th>Total Present</th>
                            <th>Salary</th>
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

export default Salary
