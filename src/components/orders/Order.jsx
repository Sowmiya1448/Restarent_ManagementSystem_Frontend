import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../orders/order.css'

const Order = () => {

    const [billno, setBillno] = useState('')
    const [date, setDate] = useState('')
    const [ordertype, SetOrdertype] = useState('')
    const [gst, setGst] = useState('')


    const [quatity, setQuantity] = useState({})
    const [table, setTable] = useState([])

    const [ordereditems, setOrdered] = useState([])
    const [tot, setTot] = useState(0)

    const [tabo, setTabo] = useState('')


    const [searchTerm, setSearchTerm] = useState("")
    const [menu, setMenu] = useState([])

    const handleSearch = (event) => {

        setSearchTerm(event.target.value)

    }

    useEffect(() => {

        axios.get("http://127.0.0.1:5000/menu/all")
            .then(response => {
               
                setMenu(response.data)
            })
            .catch(error => console.log(error))


        axios.get("http://127.0.0.1:5000/table/all")
            .then(response => {
             
                setTable(response.data)

            })
            .catch(error => console.log(error))


    }, [])

    const handlequantity = (id, value) => {

        setQuantity(prevState => ({ ...prevState, [id]: value }))
    }


    const placeorder = (_id, price) => {

        const orderedItem = menu.find(item => item._id === _id)
        const quantityValue = parseInt(quatity[_id])
        console.log(quantityValue, "quantity")

        const existingItemIndex = ordereditems.findIndex(item => item.itemname === orderedItem.itemname);

        if (existingItemIndex > -1) {

            const updatedOrderedItems = ordereditems.map((item, index) => {
                if (index === existingItemIndex) {
                    let newQuantity = parseInt(item.quantity) + quantityValue;

                    const newSubtotal = newQuantity * price;
                    return {
                        ...item,
                        quantity: newQuantity,
                        subtotal: newSubtotal
                    };
                }
                return item;
            })

            setOrdered(updatedOrderedItems);
            setTot(prevState => prevState + (price * quantityValue));

        }
        else {
            setOrdered(prevState => [
                ...prevState,
                { itemname: orderedItem.itemname, price: price, quantity: quantityValue, subtotal: price * quantityValue }
            ])

            setTot(prevState => prevState + (price * quantityValue))
        }
        setQuantity(prevState => ({ ...prevState, [_id]: "" }))
    }

let tab = table.length > 0 && table.map((data, index) => {
        return (
            <option key={index} value={data._id}>{data.tableno}</option>
        )
    })


    let result = menu.filter(menuitem => menuitem.itemname.toLowerCase().includes(searchTerm.toLowerCase())).map((data, index) => {
        return (

            <tr key={data._id}>
                <td> <p key={index}><img src={data.image} alt="" height={"50px"} width={"50px"} />
                    <br />{data.itemname}</p> </td>
                <td>{data.price}</td>

                <td><input type='number' placeholder='quantity' style={{ border: "2px solid black", borderRadius: "5px" }}
                    value={quatity[data._id]} onChange={event => handlequantity(data._id, event.target.value)} /></td>

                <td><button className='btn btn-success' onClick={() => placeorder(data._id, data.price)}>+ADD</button></td>
            </tr>
        )
    })


    const deleteorder = (index, subtotal) => {

        const updatedItems = ordereditems.filter((_, i) => i !== index)

        setOrdered(updatedItems);

        setTot(prevState => prevState - subtotal);

    }

    useEffect(() => {

        console.log(ordereditems, "order")

    }, [ordereditems])


    let cart = ordereditems.length > 0 && ordereditems.map((data, index) => {


        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.itemname}</td>
                <td>{data.price}</td>
                <td>{data.quantity}</td>
                <td>{data.subtotal}</td>

                <td><button className='btn btn-danger' onClick={() => deleteorder(index, data.subtotal)}>X</button></td>
            </tr>
        )
    })



    const submitHandle = () => {

        if (billno && date && ordertype) {

            const data = [{

                Billno: billno,
                billdate: date,
                billamount: tot,
                table_ref: tabo ? tabo : null,
                ordertype: ordertype
            },

                ordereditems,
                gst
            ]
      

     const data2 =[{

       table_ref:tabo ? tabo:null,
            
    },
      ordereditems
    ]

     axios.post("http://127.0.0.1:5000/chef/add/",data2)
     .then(response =>{
        console.log(response.data)
     })
     .catch(error =>console.log(error))


        axios.post("http://127.0.0.1:5000/order/add", data)
                .then(response => {

                    console.log(response.data)
                    alert('order received successfully !')
                    setBillno('')
                    setDate('')
                    setGst('')
                    setTabo("")
                    SetOrdertype("")
                    setOrdered([])
                    setTot(0)

                })
                .catch(error => console.log(error))

        }
        else {
            if (!billno && !date && !ordertype) alert("please fill all details")

            else {
                if (!billno) alert("please fill the billno")
                else if (!date) alert("pleae fill select the date")

                else if (!ordertype) alert("please select the ordertype")
            }

        }
    }


    return (

        <div style={{paddingLeft:"20rem"}}>
            
            <h2 className='text-center head'>Order</h2>
            <br /><br />

            <div className='order'>

                <div className='container-fluid orderfood' style={{ marginLeft: "5%" }}>

                    <label htmlFor="">Search : &nbsp;</label>

                    <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch}

                        style={{ border: "2px solid black", borderRadius: "5px" }} /> &nbsp;

                    <br /> <br />



                    <div className='container-fluid'>
                        <table className='table' style={{ width: "50%" }}>
                            <thead>
                                <tr>

                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>order</th>

                                </tr>
                            </thead>
                            <tbody>
                                {result}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='container-fluid' >
                    <br />

                    <div className='container-fluid cart'>
                        <div className='bill'>

                            &nbsp;
                            <label htmlFor="">Billno : &nbsp;</label>
                            <input type="text" value={billno} onChange={e => setBillno(e.target.value)} style={{ borderRadius: "5px", border: "2px solid black" }} /> &nbsp;

                            <label htmlFor="">Order-Type : &nbsp;</label>
                            <select style={{ border: "2px solid black", borderRadius: "5px" }} value={ordertype} onChange={e => SetOrdertype(e.target.value)}>
                                <option value="">Select a type</option>
                                <option value="Dine-In">Dine-In</option>
                                <option value="Take-away">Take-away</option>
                            </select>  &nbsp;

                            <br /> <br />

                            {(ordertype !== "Dine-In") ? "" : <>

                                <label htmlFor="">Table : &nbsp;</label>
                                <select style={{ border: "2px solid black", borderRadius: "5px" }} value={tabo} onChange={event => setTabo(event.target.value)}>
                                    <option value="">select a table no</option>
                                    {tab}
                                </select>&nbsp;
                            </>
                            }

                            <label htmlFor="">Date :&nbsp; </label>
                            <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ border: "2px solid black", borderRadius: "5px" }} /> <br /> <br />

                            <label htmlFor="">Gst : </label>
                            <input type="number" value={gst} onChange={event => setGst(event.target.value)} style={{ border: "2px solid black", borderRadius: "5px", width: "150px" }} /> &nbsp;


                            <label htmlFor="">Billamount :&nbsp; </label>
                            <input type="number" value={tot} onChange={e => setTot(e.target.value)} style={{ color: "red", border: "2px solid black", borderRadius: "5px", width: "150px" }} />&nbsp;



                        </div>


                        <h3 className='text-center' style={{ color: "white", fontWeight: "bold" }}>Your Orders &nbsp;

                        </h3>

                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>S.no</th>

                                    <th>Itemname</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>amount</th>
                                    <th>Cancel</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart}
                            </tbody>
                        </table>

                        <button style={{ marginLeft: "39%", marginBottom: "10px" }} className='btn btn-warning text-center' onClick={submitHandle}>Place your Order</button>


                    </div>





                </div>

            </div>


        </div>
    )
}

export default Order