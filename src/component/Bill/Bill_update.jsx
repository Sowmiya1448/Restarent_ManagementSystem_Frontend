import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Bill_update = () => {

    const navigate = useNavigate()

    const params = useParams()

    const { id } = params

    const[disable,setDisable] = useState(false)

    const [billnumber, setBillnumber] = useState('')
    const [billdate, setBilldate] = useState('')


    const [billproduct, setBillproduct] = useState([])

    const [laptop, setLaptop] = useState([])

    const [customerlist, setCustomer] = useState([])
    const [customer_id, setCustomer_id] = useState('')

    const [stock_data, setStock] = useState([])

    const [exquantiy, setExquantity] = useState([])

    const[validate,setValidate] =useState([])

    const[billupdate_validation,setBillupdatevalidation] = useState(false)

    let stock =[]





    useEffect(() => {

        axios.get(`http://127.0.0.1:8001/bill/${id}`)

            .then(response => {

                console.log(response.data, "bill&product datas")

                setBilldate((response.data.bill_data.bill_date).slice(0, 10))

                setBillnumber(response.data.bill_data.billno)

                setCustomer_id(response.data.bill_data.customer_ref)


                setExquantity(response.data.product_data)

                const child_data = []

                for (let product of response.data.product_data) {

                    product.existing = true
                    product.new = false
                    product.update = false
                    product.delete = false

                    child_data.push(product)

                }

                setBillproduct(child_data)

            })
            .catch(error => console.log(error))

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


        axios.get("http://127.0.0.1:8001/stock/all")
            .then(response => {
                console.log(response.data, "stocklist")
                setStock(response.data)

            })
            .catch(error => console.log(error))

    }, [])

    useEffect(() => {
        
       console.log(exquantiy, "existing data")
    }, [exquantiy])


    useEffect(() => {

        console.log(billproduct, "bill product in bill_list")



    }, [billproduct])


    const laptops = laptop.length > 0 && laptop.map((lap, index) => {

        return (

            <option key={index} value={lap._id}>{lap.brandname}</option>

        )
    })


    const result = billproduct.map((product, index) => {

        return (

            <div key={index} style={{ backgroundColor: product.delete === true && "skyblue" }}>

                <label>Laptop: </label>

                <select value={product.laptop_reference} onChange={event => updateLaptop(event, index, "id")} >
                    <option value="" >select a option</option>
                    {laptops}
                </select>

                <label htmlFor="">Quantity:</label>
                <input type="number" value={product.quantity} onChange={event => updateLaptop(event, index, "quantity")} />
        
                
               
                <label htmlFor="">gst:</label>
                <input type="number" value={product.gst} onChange={event => updateLaptop(event, index, "gst")} /> &nbsp;

                <input type='button' className='btn btn-danger' value={'X'} onClick={event => billdelete(event, index)} />

            </div>
        )

    })

  const addlaptop = (event) => {

        event.preventDefault()

        const newlaptop_obj = {

            laptop_reference: '',
            quantity: 0,
            gst: 0,
            existing: false,
            new: true,
            update: false,
            delete: false

        }

        setBillproduct([...billproduct, newlaptop_obj])
    }


    const updateLaptop = (event, index, field) => {

        console.log(event.target.value, "value")

        const lapduplicate = [...billproduct]


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
                    setBillupdatevalidation(true)
                    
                 } 

                 else{
                    setValidate('')
                    setDisable(false)
                    setBillupdatevalidation(false)
                 }

                break;

            case "gst":
                lapduplicate[index].gst = event.target.value
                break;

        }

        if (lapduplicate[index].existing === true) lapduplicate[index].update = true

        setBillproduct(lapduplicate)
    }


    const billdelete = (event, index) => {

        const lapduplicate = [...billproduct]

        if (lapduplicate[index].existing === true) {

            lapduplicate[index].delete = true
            lapduplicate[index].update = false
        }
        else {

            lapduplicate.splice(index, 1)
        }

        setBillproduct(lapduplicate)

    }

     useEffect(() => {
   
            if (billproduct.length > 0) 
                {
            for (let bill of billproduct) {

                stock.push({ "lap_id": bill.laptop_reference, "quantity": bill.quantity, "update": bill.update, "existing": bill.existing })
            }

            console.log(stock, "stocky")
        }
},[])


    const updateBill = (event) => {

        event.preventDefault()
        const data = [{

            billno: billnumber,
            bill_date: billdate,
            customer_ref: customer_id
        },
            billproduct
          
        ]

        axios.patch(`http://127.0.0.1:8001/bill/${id}`, data)
            .then(response => {
                console.log(response.data)
                navigate('/bill_list')

            })
            .catch(error => console.log(error));

}


    let custo_mers = customerlist.map((data, index) => {

        return (
            <option key={index} value={data._id}>{data.customername}</option>
        )

    })

    

    return (

        <div>

            <h2 className='text-center'>Bill Update</h2>

            <div className='container-fluid'>
                <button className='btn btn-secondary float-end' onClick={() => navigate('/bill_list')}>Back</button>
                <br /><br />
            </div>
            <div className='container-fluid'>
                <form className='form-control'>

                    <label htmlFor="">Billno: </label>
                    <input type="text" className='form-control' value={billnumber} onChange={event => setBillnumber(event.target.value)} />

                    <label htmlFor="">Date: </label>
                    <input type="date" className='form-control' value={billdate} onChange={event => setBilldate(event.target.value)} />

                    <label htmlFor="">Dealer : </label>
                    <select className='form-control' value={customer_id} onChange={event => setCustomer_id(event.target.value)}>
                        <option value="">select a customer</option>
                        {custo_mers}
                    </select> <br /> <br />

                    
                
                    <div className='container-fluid'>
                        <button className='btn btn-info float-end' onClick={event => addlaptop(event)} >+add laptop</button>
                    </div> <br /> <br />

                    <p className='text-center'> {(billupdate_validation === true) ?(validate && <p style={{ color: "red" }}>the Available stock is {validate}</p>):""}</p>

                    {result}

                    <input type="submit" disabled={disable} className='btn btn-info' onClick={(event) => updateBill(event)} /><br /> <br />
              </form>
            </div>


        </div>
    )
}

export default Bill_update