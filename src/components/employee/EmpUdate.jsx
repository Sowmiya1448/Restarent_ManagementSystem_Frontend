import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import ImageDisplay from '../imageUpload/ImageDisplay'

const EmpUdate = () => {

    const navigate = useNavigate()

    const params = useParams()
    
    const {id} = params

    const [categoryid, setCategoryid] = useState('')
    const[empid,setEmpid] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [phno, setPhno] = useState('')
    const [address, setAddress] = useState('')
    const [salary, setSalary] = useState('')
    const[Roledata,setRoledata] = useState([])

    const [image_source, setImageSource] = useState('')

    const handleImageChange = event => {

        const file = event.target.files[0]

        const reader = new FileReader()

        reader.onloadend = () => {

            const base64 = reader.result

            setImageSource(base64)

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
            image:image_source,
            category_ref:categoryid
        }

      
         
        axios.patch(`http://127.0.0.1:5000/employee/${id}`,data)
        .then(response =>{
            console.log(response.data,"image")
            setImageSource(response.data.image)
            navigate('/emp/')
           
        })
        .catch(error =>console.log(error))
   
      
      }

      useEffect(() =>{

        axios.get(`http://127.0.0.1:5000/employee/${id}/`)
        .then(response =>{
    
            console.log(response.data,"emp")

            setName(response.data.empname)
            setEmpid(response.data.empid)
            setAge(response.data.age)
            setAddress(response.data.address)
            setGender(response.data.gender)
            setPhno(response.data.phno)
            setSalary(response.data.salaryPerDay)
            setCategoryid(response.data.category_ref)
            setImageSource(response.data.image)
            
        })
        .catch(error =>console.log(error))

          
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
        <h2 className='text-center head'>EMPLOYEE UPDATE</h2> <br />

        <div className='container-fluid'>
            <button className='btn btn-secondary float-end'onClick={() =>navigate('/emp/')}>Back</button> <br /><br />
        </div>

        <div className='container-fluid' style={{ width: "35%", marginLeft: "30%"}}>
            <form className='form-control'>
                   <label>Role: </label>
                    <select className='form-control' value={categoryid} onChange={event => setCategoryid(event.target.value)}>
                        <option value="" >select a category</option>
                        {role}
                    </select>

                    <label htmlFor="">Emp_ID:</label>
                    <input type="text" className='form-control' value={empid} onChange={(event) => setEmpid(event.target.value)} />

                    <label htmlFor="">Name:</label>
                    <input type="text" className='form-control' value={name} onChange={(event) => setName(event.target.value)} />

                    <label htmlFor="">Age:</label>
                    <input type="text" className='form-control' value={age} onChange={(event) => setAge(event.target.value)} />


                    <label>Gender : &nbsp; </label>
                    <label><input type="radio" name='gender' value="female" checked={gender === 'female'} onChange={event =>setGender(event.target.value)}/>Female</label> &nbsp;
                    <label><input type="radio" name='gender' value= "male" checked={gender === 'male'}  onChange={event =>setGender(event.target.value)}/>Male</label> <br />

                  

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

export default EmpUdate