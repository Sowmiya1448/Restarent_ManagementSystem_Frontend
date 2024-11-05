import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Customer_update = () => {

    const navigate = useNavigate()

    const params = useParams()
    const { id } = params

    const [name, setName] = useState('')
    const [companyname, setCompany] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [phno, setPhno] = useState('')


    useEffect(() => {

        axios.get(`http://127.0.0.1:8001/customer/${id}`)
            .then(response => {
                // console.log(response.data, "customer")
                setName(response.data.customername)
                setCompany(response.data.companyname)
                setAddress(response.data.address)
                setEmail(response.data.email)
                setPhno(response.data.phonenumber)
            })
            .catch(error => console.log(error))



    }, [])


    const submithandle = (event) => {

        event.preventDefault()
        const data = {
            customername: name,
            companyname: companyname,
            address: address,
            email: email,
            phonenumber: phno

        }
        axios.patch(`http://127.0.0.1:8001/customer/${id}`, data)
            .then(response => {
                console.log(response.data)
                navigate('/customer')

            })
            .catch(error => console.log(error))


    }


    return (

        <div>
            <h2 className='text-center'>Customer Update</h2>

            <div className='container-fluid'>
                <button className='btn btn-secondary float-end' onClick={() => navigate('/customer')}>Back</button>
            </div>


            <div className='container-fluid' style={{ width: '50%', alignItems: "center" }}>
                <form className='form-control'>

                    <label htmlFor="">Customer Name: </label>
                    <input type="text" className='form-control' value={name} onChange={event => setName(event.target.value)} />

                    <label htmlFor="">Company Name: </label>
                    <input type="text" className='form-control' value={companyname} onChange={event => setCompany(event.target.value)} />

                    <label htmlFor="">Address: </label>
                    <input type="textarea" className='form-control' value={address} onChange={event => setAddress(event.target.value)} />

                    <label htmlFor="">Email: </label>
                    <input type="email" className='form-control' value={email} onChange={event => setEmail(event.target.value)} />

                    <label htmlFor="">phone no: </label>
                    <input type="Number" className='form-control' value={phno} onChange={event => setPhno(event.target.value)} /> <br />

                    <input type="submit" className='btn btn-info form-control' onClick={event => submithandle(event)} />

                </form>




            </div>


        </div>
    )
}

export default Customer_update