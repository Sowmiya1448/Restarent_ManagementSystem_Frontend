import React, { useEffect, useState } from 'react'
import '../Loginpage/login.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [c_pwd, setC_pwd] = useState('')
    const [pwd, setPwd] = useState('')
    const [role, setrole] = useState('')
    const [err, setEror] = useState('')

    const submithandle = () => {

        if (c_pwd === pwd) {

            const data = {

                email: email,
                password: pwd,
                admin: (role === "admin") ? true : false,
                chef: (role === "chef") ? true : false

            }

            axios.post("http://127.0.0.1:5000/signup/create/", data)
                .then(response => {
                    console.log(response.data)
                    setC_pwd('')
                    setEmail('')
                    setPwd('')
                    navigate('/')
                })
                .catch(error => console.log(error))
        }

        else {

            setEror("Enter correct password")

        }
    }

    useEffect(() => console.log(role, "role"))
    

    return (


        <div className='back' style={{ paddingLeft: "20rem" }}>


            <div className='logg' >
                <h3 className='text-center'>Sign Up</h3>

                <form action="">
                    <label>Role : </label>
                    <select className='form-control' value={role} onChange={event => setrole(event.target.value)} >
                        <option value="">select a role</option>
                        <option value="admin">Admin</option>
                        <option value="chef">Chef</option>
                    </select>

                    <label htmlFor="">Email :</label>
                    <input type="email" className='form-control inp' placeholder='enter your email' value={email} onChange={event => setEmail(event.target.value)} />

                    <label htmlFor=""> Password : </label>  <br />
                    <input type="password" className='form-control inp' placeholder='password' value={pwd} onChange={event => setPwd(event.target.value)} />

                    <label htmlFor=""> confirm Password : </label>  <br />
                    <input type="password" className='form-control inp' placeholder='password' value={c_pwd} onChange={event => setC_pwd(event.target.value)} />
                    <p style={{ color: "red" }}>{err}</p>
                    <br />

                    <button type='button' className='btn logbut' onClick={submithandle}>Sign Up</button>
                    <br /> <br />
                    <NavLink className={"nav-link signup"} to={'/'} target='_self'><u>Already have an account? Login</u></NavLink>


                </form>
            </div>
        </div>


    )
}

export default Signup