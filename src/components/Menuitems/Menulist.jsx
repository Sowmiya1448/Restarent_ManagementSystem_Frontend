import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import edit from '../images/edit.png'
import dele from '../images/trash-can.png'

const Menulist = () => {

  const navigate = useNavigate()
  const[menulist,setMenulist]  = useState([])
  const[category,setCategory] = useState([])

  const[del,setDel] = useState([])

  useEffect(() =>{

    axios.get("http://127.0.0.1:5000/menu/all")
    .then(response =>{
      console.log(response.data,"menu")
      setMenulist(response.data)
    })
    .catch(error =>console.log(error))

    axios.get("http://127.0.0.1:5000/foodcategory/all")
    .then(response =>{
      console.log(response.data,"foodcategory")
      setCategory(response.data)
    })
    .catch(error =>console.log(error))

  },[])


  let result = menulist.length>0 ? menulist.map((data,index) => {

    let cato = category.find(cat =>cat._id === data.category_ref)
    return(

        <tr key={data._id}>
          <td>{index+1}</td>
          <td><img src={data.image} alt="" height={"50px"} width={"50px"} /></td>
          <td>{data.itemname}</td>
          <td>{cato ?cato.categoryname:""}</td>
          <td>{data.price}</td>
          <td><button className='btn' onClick={() =>navigate(`/updatemenu/${data._id}`)}><img src={edit} height={"30px"} width={"30px"}/></button></td>
          <td><button className='btn' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() =>setDel(data)}><img src={dele} height={"30px"} width={"30px"}/></button></td>
          </tr>
      )
      
  }): <tr>
    <td colSpan={8}>NO DATA FOUND</td>
</tr>


const deletehandle = () =>{

  axios.delete(`http://127.0.0.1:5000/menu/${del._id}`)
  .then(response =>{
      console.log(response.data)

      let duplicate = [...menulist]
      duplicate.splice(menulist.findIndex(menu =>menu._id === del._id),1)
      setMenulist(duplicate)

   })
  .catch(error =>console.log(error))
}


    
  return (

     
    <div style={{paddingLeft:"20rem"}}>

         <h2 className='text-center head'>Menu List</h2> <br />
         
         <div className='container-fluid'>
          <button className='btn btn-outline-info float-end' onClick={() =>navigate('/addmenu/')}>+Add menuItems</button> <br /> <br />
         </div> <br />
         <div className='container-fluid' style={{width:"70%"}}>
          <table className='table table-bordered text-center'>
            <thead>
              <tr>
                <th>S.no</th>
                 <th>Image</th>
                <th>Item</th>
                <th>Category</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>
               </tr>
            </thead>
            <tbody>
                {result}
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
                            <p>Are you sure you want to delete {del.itemname}?</p>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={deletehandle} >delete</button>
                        </div>
                    </div>
                </div>
            </div>


    </div>
  )
}

export default Menulist