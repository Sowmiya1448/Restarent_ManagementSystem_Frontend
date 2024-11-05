import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ImageDisplay from '../imageUpload/ImageDisplay'

const Empadd = () => {

    const navigate = useNavigate()

    const [categoryid, setCategoryid] = useState('')
    const [empid,setEmpid]= useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [phno, setPhno] = useState('')
    const [address, setAddress] = useState('')
    const [salary, setSalary] = useState('')
    const[Roledata,setRoledata] = useState([])


    const [base64String, setBase64String] = useState('')
    const [image_source, setImageSource] = useState('')

    const handleImageChange = event => {

        const file = event.target.files[0]

        const reader = new FileReader()

        reader.onloadend = () => {

            const base64 = reader.result

            setBase64String(base64)
        }

        reader.readAsDataURL(file)
    }

   
    const submitHandle = (event) => {

        event.preventDefault()

        const data ={
            
            empid:empid,
            empname:name,
            age:age,
            phno:phno,
            gender:gender,
            address:address,
            salaryPerDay:salary,
            image:base64String,
            category_ref:categoryid
        }

        axios.post("http://127.0.0.1:5000/employee/add/",data)
        .then(response => {
          
            setImageSource(response.data.image)
            navigate('/emp/')
        })
        .catch(error => console.log(error))

}

      useEffect(() =>{
          
        axios.get("http://127.0.0.1:5000/emprole/all")
        .then(response =>{
    
            setRoledata(response.data)
        })
        .catch(error =>console.log(error))

      },[])

       let role = Roledata.length >0 && Roledata.map((data,index) =>{
        return(

            <option key={index} value={data._id}>{data.categoryname}</option>
        )

      })

 

    return (

        <div style={{paddingLeft:"20rem"}}>

            <h2 className='text-center'>ADD EMPLOYEES</h2>

            <div className='container'>
                <button className='btn btn-info float-end' onClick={() => navigate('/emp/')}>Back</button> <br />
            </div>
            <div className='container-fluid'>
                <form action="" style={{ width: "50%", marginLeft: "25%" }}>

                    <label>Role: </label>
                    <select className='form-control' onChange={event => setCategoryid(event.target.value)}>
                        <option value="" >select a category</option>
                        {role}
                    </select>

                    <label htmlFor="">EMP_ID :</label>
                    <input type="text" className='form-control' value={empid} onChange={(event) => setEmpid(event.target.value)} />

                    <label htmlFor="">Name:</label>
                    <input type="text" className='form-control' value={name} onChange={(event) => setName(event.target.value)} />

                    <label htmlFor="">Age:</label>
                    <input type="text" className='form-control' value={age} onChange={(event) => setAge(event.target.value)} />


                    <label>Gender : &nbsp; </label>
                    <label><input type="radio" name='gender' value="female" onChange={event =>setGender(event.target.value)}/>Female</label> &nbsp;
                    <label><input type="radio" name='gender' value= "male"  onChange={event =>setGender(event.target.value)}/>Male</label> <br />

                  

                    <label htmlFor="">Phno:</label>
                    <input type="text" className='form-control' value={phno} onChange={event => setPhno(event.target.value)} />

                    <label htmlFor="">Address:</label>
                    <input type="textarea" className='form-control' value={address} onChange={event => setAddress(event.target.value)} />

                    <label htmlFor="">Salary_per_Day:</label>
                    <input type="text" className='form-control' value={salary} onChange={event => setSalary(event.target.value)} />
                    <br />

                    <div>
                        <label>Upload a Image: &nbsp;</label>

                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        
                        <ImageDisplay source={image_source}></ImageDisplay>
                  </div>


                    <br />

                    <input type="submit" className='form-control btn btn-info' onClick={(event) => submitHandle(event)} />

                </form>

            </div>






        </div>

    )
}

export default Empadd