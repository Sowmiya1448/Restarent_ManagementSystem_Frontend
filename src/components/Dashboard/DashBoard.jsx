import React, { useEffect, useState } from 'react'
import '../Dashboard/dash.css'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import bill from '../images/bill.png'
import money from '../images/money.png'
import emp from '../images/employee.png'
import emp1 from '../images/success.png'
import menus from '../images/menu.png'
import dish from '../images/dish.png'



const DashBoard = () => {
    const [empcount, setEmp] = useState([])
    const [foodcato, setFloodcato] = useState([])
    const [menu, setMenu] = useState([])
    const [presentcount, setPresentCount] = useState([])
    const [billdata, setBilldata] = useState([])
    const [totalamount, setTotalamount] = useState('')
    const [weeklySalesData, setWeeklySalesData] = useState([])

    useEffect(() => {

        const today = new Date().toISOString().split("T")[0]


        axios.get("http://127.0.0.1:5000/order/weekly-sales")
            .then(response => {
                  
                console.log(response.data,"weekly sales")
                setWeeklySalesData(response.data.weeklySales)
            })
            .catch(error => console.log(error));

            axios.get(`http://127.0.0.1:5000/attendance/presentcount?date=${today}`)
            .then(response => {
                console.log(response.data, "present")
                setPresentCount(response.data.presentCount)
            })
            .catch(error => console.log(error));

            axios.get(`http://127.0.0.1:5000/paidbills/billcount?date=${today}`)
            .then(response =>{
    
                console.log(response.data,"billdata")
                setBilldata(response.data.presentbillCount)
                setTotalamount(response.data.amount)
                
            })
            .catch(error =>console.log(error))


        axios.get("http://127.0.0.1:5000/employee/all/")
            .then(response => {

                setEmp(response.data)
            })
            .catch(error => console.log(error))

        axios.get("http://127.0.0.1:5000/foodcategory/all")
            .then(response => {

                setFloodcato(response.data)

            })
            .catch(error => console.log(error))

        axios.get("http://127.0.0.1:5000/menu/all")
            .then(response => {

                setMenu(response.data)
            })
            .catch(error => console.log(error))

     

       
    }, [])



    return (
        <div className='main' style={{paddingLeft:"20rem"}}>
            
            <h2 className='text-center head'>Dashboard</h2>
            <br /> <br />

            <div className='cont'>
           
            
                <div className='emp box1'>
                    <h4 className='totemp'>Total bills</h4>
                    <img src={bill} alt="" width={"50px"} height={"50px"} />
                    <h4>{(billdata) ? billdata :"0" }</h4>
                </div>
                <div className='emp box2'>
                    <h4 className='totemp'>Total Sales Amount</h4>
                    <img src={money} alt="" width={"50px"} height={"50px"} />
                    <h4>${Math.round(totalamount)}</h4>
                </div>

                <div className='chart'>
                    
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={weeklySalesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="totalSales" stroke="#82ca9d" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                    
                 </div>

    
             <div className='emp box3'>
                    <h4 className='totemp'>Total present</h4>
                    <img src={emp1} alt="" width={"50px"} height={"50px"} />
                    <h4>{presentcount ? presentcount :"0"}</h4>
                </div>

                <div className='emp box4'>
                    <h4 className='totemp'>Total employees</h4>
                    <img src={emp} alt="" width={"50px"} height={"50px"} />
                    <h4>{empcount.length}</h4>
                </div>

  

                <div className='emp box5'>
                    <h4 className='totemp'>Food Categories</h4>
                    <img src={dish} alt="" width={"50px"} height={"50px"} />
                    <h4>{foodcato.length}</h4>
                </div>

                <div className='emp box6'>
                    <h4 className='totemp'> Total Menu Items</h4>
                    <img src={menus} alt="" width={"70px"} height={"70px"} />
                    <h4>{menu.length}</h4>
                </div>
          
                </div>

             



       
        </div>
    )
}

export default DashBoard
