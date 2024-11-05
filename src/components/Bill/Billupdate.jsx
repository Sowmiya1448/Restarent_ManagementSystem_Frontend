import React, { Children, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Billupdate = () => {

    const navigate = useNavigate()

    const { id } = useParams()

    const [billno, setBillno] = useState([])

    const [billdate, setBilldate] = useState([])

    const[billstatus,setBillstatus] = useState('')

    const [billproduct, setBillproduct] = useState([])

    const [menu, setMenu] = useState([])


    useEffect(() => {

        axios.get(`http://127.0.0.1:5000/order/${id}/`)
            .then(response => {

                setBillno(response.data.bill_data.Billno)
                setBilldate((response.data.bill_data.billdate).slice(0, 10))
                setBillstatus(response.data.bill_data.billstatus)
            

                const child_data = []

                for (let item of response.data.items_data) {
                    
                    item.update = false
                    item.delete = false
                    child_data.push(item)

                }
                setBillproduct(child_data)
                
            })
            .catch(error => console.log(error))

        axios.get("http://127.0.0.1:5000/menu/all/")
            .then(response => {
               
                setMenu(response.data)
            })
            .catch(error => console.log(error))
    }, [])


    useEffect(() =>{

           if(billproduct){

            console.log(billproduct,"sowmi")
           }

    },[billproduct])


    const updateitem = (event, index, field) => {

        console.log(event.target.value, "value")

        const duplicate = [...billproduct]

        switch (field) {

           case "quantity":
                duplicate[index].quantity = event.target.value ? Number(event.target.value) :0
                break;

            case "gst":
                duplicate[index].gst = event.target.value ? Number(event.target.value) :0
                break;
        }

       duplicate[index].update = true

        setBillproduct(duplicate)

    }


    let result = billproduct.length ? billproduct.map((data, index) => {

        let menuitem = menu.find(menus => menus._id === data.item_ref)
    
        return (
        
                <tr key={index} >
                <td  style={{ backgroundColor:data.delete === true && "skyblue" }}>{index + 1}</td>
                <td  style={{ backgroundColor:data.delete === true && "skyblue" }}>{menuitem && menuitem.itemname}</td>
                <td style={{ backgroundColor:data.delete === true && "skyblue" }}><input type="number" style={{ width: "80px" }} value={data.quantity} onChange={event => updateitem(event, index, "quantity")} /></td>
                <td style={{ backgroundColor:data.delete === true && "skyblue" }}><input type="number" style={{ width: "80px" }} value={data.gst} onChange={event => updateitem(event, index, "gst")} /></td>

                <td  style={{ backgroundColor:data.delete === true && "skyblue" }}><button className='btn btn-danger' onClick={(event)=>deletehandle(event,index)}>X</button></td>
            </tr>
         
        )

    }) : <tr>
        <td colSpan={8}>NO DATA FOUND</td>
    </tr>

    const deletehandle = (event,index) =>{
        event.preventDefault()

       const dup =[...billproduct]
       dup[index].delete =true
       dup[index].update = false
     

       setBillproduct(dup)

    }

const submitHandle = (event) => {

        event.preventDefault()

        const data = [{
            Billno: billno,
            billdate: billdate,
            billstatus:billstatus
        },

            billproduct
        ]
         
        axios.patch(`http://127.0.0.1:5000/order/${id}`, data)
            .then(response => {

                console.log(response.data)

                navigate('/bill/')
            })
            .catch(error => console.log(error))


if(billstatus === "PAID")
{


    axios.post("http://127.0.0.1:5000/paidbills/add/",data)
    .then(response => {

       console.log(response.data)

   })
   .catch(error => console.log(error))


}



}



    return (

        <div style={{paddingLeft:"20rem"}}> 
            
            <h2 className='text-center head'>Billupdate</h2>
            <br />

            <div className='container-fluid'>
                <button className='btn btn-secondary float-end' onClick={() => navigate('/bill/')}>Back</button>
            </div> <br /> <br />

            <div className='container-fluid' style={{ marginLeft: '200px' }}>

                <form className='form-control' style={{ width: "60%" }}>

                    <label htmlFor="">Billno: </label>
                    <input type="text" className='form-control' value={billno} onChange={event => setBillno(event.target.value)} />
                    <label htmlFor="">Date : </label>
                    <input type="date" className='form-control' value={billdate} onChange={event => setBilldate(event.target.value)} />

                    <label htmlFor="">Status : </label>

                    <select className='form-control' style={{color:billstatus === "PAID" ? "green" :"red"}} value={billstatus}  onChange={event =>setBillstatus(event.target.value)}>
                        <option value="UNPAID">UNPAID</option>
                        <option value="PAID">PAID</option>
                    </select>
                    <br />

                    <h4 className='text-center' style={{ color: "orange", fontWeight: "bold" }}>Ordered Items</h4>
                    <div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Gst</th>
                                    <th>X</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result}
                            </tbody>
                        </table>

                    </div>

                    <input type="submit" className='text-center btn btn-info' style={{ marginLeft: "50%" }} onClick={(event) =>submitHandle(event)} />


                </form>
            </div>






        </div>
    )
}

export default Billupdate