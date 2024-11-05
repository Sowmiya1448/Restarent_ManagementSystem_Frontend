import React, { useState, useEffect } from 'react'
import '../css/laptop.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Bill = () => {

    const navigate = useNavigate()

    const[disable,setDisable] = useState(false)

    const [billno, setBillno] = useState("")
    const [billdate, setBilldate] = useState("")

    const [laptop, setLaptop] = useState([])
    const [laptoplist, setLaptoplist] = useState([])

    const [customerlist, setCustomer] = useState([])
    const [customer_id, setCustomer_id] = useState('')

    const[stock_data,setStock] = useState([])

    const[validate,setValidate] = useState('')

   
    let stock= []


  
const createBill = (event) => {

        event.preventDefault()

        const data = [{

            billno: billno,
            bill_date: billdate,
            customer_ref: customer_id
        },
            laptoplist,
            
        ]

        axios.post('http://127.0.0.1:8001/bill/add', data)
            .then(response => {
                console.log(response.data,)
            navigate('/bill_list')

            })
            .catch(error => console.log(error));


        for(let st of stock_data)
            {

            for(let stocky of stock)
                {
                    if(st.laptop_reference === stocky.lap_id)
                    {
                        
                    const data ={

                            stocklist:st.stocklist - stocky.quantity
                        }

                        axios.patch(`http://127.0.0.1:8001/stock/${st._id}`,data)
                        .then(response =>{
                            console.log(response.data)
                        })
                        .catch(error =>console.log(error))
                    }
                }

            }
}



useEffect(() =>{

    
if(laptoplist.length>0)
    {
        for(let lap of laptoplist){
    
        stock.push({"lap_id":lap.laptop_reference,"quantity":lap.quantity})
    }
    
    console.log(stock,"stock data")
    }


},[laptoplist])


useEffect(() =>{
    
    axios.get("http://127.0.0.1:8001/stock/all")
    .then(response =>{
     console.log(response.data,"stocklist")
     setStock(response.data)

    })
    .catch(error => console.log(error))

},[])



     const addlaptop = (event) => {

        event.preventDefault()

        const newlaptop_obj = {

            laptop_reference: '',
            quantity: 0,
            gst: 0,

        }


        setLaptoplist([...laptoplist, newlaptop_obj])
    }



    const updateLaptop = (event,index, field) => {

        console.log(event.target.value, "value")

   const lapduplicate = [...laptoplist]

        switch (field) {

            case "id":
                lapduplicate[index].laptop_reference = event.target.value
                break;

            case "quantity":
                lapduplicate[index].quantity = event.target.value
               
                const validation = stock_data.find(st => st.laptop_reference === lapduplicate[index].laptop_reference)

               console.log(validation,"validate data")
               
               if (event.target.value >= validation.stocklist)

                 {
                setValidate(validation.stocklist)
                setDisable(true)
                 } 

                 else{
                    setValidate('')
                    setDisable(false)
                 }
               break;

            case "gst":
                lapduplicate[index].gst = event.target.value
                break;

        }

        setLaptoplist(lapduplicate)

  }


    const laptops = laptop.length > 0 && laptop.map((lap, index) => {

        return (

            <option key={index} value={lap._id}>{lap.brandname}</option>

        )
    })

    let result =[]

    


       result = laptoplist.length > 0 && laptoplist.map((lap, index) => {

      return (
            <div key={index}>

                <label>Laptop: </label>

                <select onChange={event => updateLaptop(event, index, "id")}>
                    <option value="" >select a option</option>
                    {laptops}
                </select>&nbsp;


                <label htmlFor="">Quantity:</label>
                <input type="number"  onChange={event => updateLaptop(event,index, "quantity")} />&nbsp;
           
              

                <label htmlFor="">gst:</label>
                <input type="number" onChange={event => updateLaptop(event, index, "gst")} /> <br />&nbsp;

            </div>

        )
    })





    useEffect(() => {

        console.log(laptoplist,"laptoplist")



    }, [laptoplist])


    useEffect(() => {

        axios.get('http://127.0.0.1:8001/laptop/all/')
            .then(response => {
                
                setLaptop(response.data)
            })
            .catch(error => console.log(error));

        axios.get("http://127.0.0.1:8001/customer/all/")
            .then(response => {
            
                setCustomer(response.data)
            })
            .catch(error => console.log(error))
    }, [])


    let custo_mers = customerlist.map((data, index) => {

        return (
            <option key={index} value={data._id}>{data.customername}</option>
        )

    })

    return (
        <div>

            <h2 className='text-center'>Laptop Bill</h2>

            <div className='container'>
                <button className='btn btn-info float-end' onClick={() => navigate('/laptop/')}>Back</button> <br /><br />
            </div>

            <div className='con'>
                <form className='form-control'>

                    <label htmlFor="">Billno: </label>
                    <input type="text" className='form-control' value={billno} onChange={e => setBillno(e.target.value)} /> &nbsp;

                    <label htmlFor="">BillDate: </label>
                    <input type="date" className='form-control' value={billdate} onChange={e => setBilldate(e.target.value)} />

                    <label htmlFor="">Dealer : </label>
                    <select className='form-control' onChange={event => setCustomer_id(event.target.value)}>
                        <option value="">select a customer</option>
                        {custo_mers}
                    </select> <br /> <br />

                    <div className='container-fluid'>
                        <button className='btn btn-info' onClick={event => addlaptop(event)}>+ Add laptops</button> <br /> <br />
                    </div>
                    
                    <p className='text-center'>{(disable === true) ?(validate && <p style={{ color: "red" }}>the Available stock is {validate}</p>):""}</p>
                    
                    {result}

                    <input type="submit" disabled={disable} className='btn btn-info' onClick={(event) => createBill(event)} /><br /> <br />

                </form>
            </div>



        </div>
    )
}

export default Bill