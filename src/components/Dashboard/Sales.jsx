import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const SalesGraph = () => {
    const [weeklySalesData, setWeeklySalesData] = useState([])

useEffect(() =>{

    axios.get("http://127.0.0.1:5000/order/weekly-sales")
    .then(response => {
    
        setWeeklySalesData(response.data.weeklySales)
    })
    .catch(error => console.log(error));

},[])

return (
    <div>
      <h2>Sales Graph</h2>
      <ResponsiveContainer width="50%" height={300}>
        <LineChart data={weeklySalesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalSales" stroke="#82ca9d" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SalesGraph;