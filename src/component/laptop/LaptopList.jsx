import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const LaptopList = () => {

    
    const [laptop, setLaptop] = useState([])
    const [selectId, setSelectId] = useState(0)

    const [categorylist, setCategorylist] = useState([])
    const[stocklist,setStocklist] = useState([])



    const navigate = useNavigate()

    useEffect(() => {

        axios.get('http://127.0.0.1:8001/laptop/all/')
            .then(response => {
                // console.log(response.data)
                setLaptop(response.data)
            })
            .catch(error => console.log(error));


     


            const headers ={

                'content-Type':'application/json',
                'Authorization':` Bearer ${localStorage.getItem('Bearer')}`
    
            }

        console.log(headers)


        axios.get('http://127.0.0.1:8001/category/all',{headers})
            .then(response => {
                // console.log(response.data)
                setCategorylist(response.data)
            })
            .catch(error => console.log(error))

    }, [])



    let res =laptop.length>0?  laptop.map((data, index) => {

        let cate = categorylist.find(cat => data.category_ref === cat._id)

        return (

            <tr key={data._id}>

                <td>{index + 1}</td>
                <td>{data.brandname}</td>
                <td>{data.modelno}</td>
                <td>{data.price}</td>
                <td>{cate?cate.categoryname:"-"}</td>
                <td><button className='btn btn-info' onClick={() => navigate(`/lap/update/${data._id}/`)}>Update</button></td>
                <td><button className='btn  btn-danger' data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                onClick={() => setSelectId(data)}>Delete</button></td>

            </tr>
        )
    }): <tr>
        <td colSpan={15}>NO DATA FOUND</td>
    </tr>

useEffect(() =>{

    axios.get('http://127.0.0.1:8001/stock/all')
    .then(response =>{
        // console.log(response.data,"stock")
        setStocklist(response.data)
    })
    .catch(error =>console.log(error))

 },[])





    const deleteHandle = () => {

        axios.delete(`http://127.0.0.1:8001/laptop/delete/${selectId._id}/`)
            .then(response => {
                console.log(response.data)

                let duplicate = [...laptop]
                duplicate.splice(laptop.findIndex(lap => lap._id === selectId._id), 1)
                setLaptop(duplicate)
                navigate('/laptop/')

            })
            .catch(error => console.log(error));


            let result =[]

            if(stocklist.length>0)
            {
               result = stocklist.find(st =>st.laptop_reference === selectId._id)
                   
               console.log(result,"stock delete")
               
            }

            axios.delete(`http://127.0.0.1:8001/stock/${result._id}/`)
            .then(response => {

                console.log(response.data)

             navigate('/laptop/')

            })
            .catch(error => console.log(error));
}

    return (

         
        <div>
            

            <h2 style={{ textAlign: 'center' }}>Laptops List</h2>

            <div className='container-fluid'>
                <button className='btn  btn-info float-end' onClick={() => navigate('/add/')}>
                    + Add LaptopList
                </button>
            </div>


            <div style={{ paddingTop: "50px" }} className='container-fluid'>
                <table style={{ textAlign: 'center', width: "100%" }} className="table table-bordered">
                    <thead>
                        <tr>
                            <th>S.NO</th>
                            <th>Brandname</th>
                            <th>Model no</th>
                            <th>Price</th>
                            <th>category</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {res}
                    </tbody>
                </table>
            </div>




            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Delete</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete {selectId.brandname}?</p>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={deleteHandle}>delete</button>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default LaptopList