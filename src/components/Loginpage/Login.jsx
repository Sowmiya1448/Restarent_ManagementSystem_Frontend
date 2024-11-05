import React, { useState, useEffect } from 'react'
import '../Loginpage/login.css'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Login = ({ setview, setAdmin }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const [error, setError] = useState('')

    const submitdata = event => {

        event.preventDefault()
        console.log(email, password)

        const user_data = {

            email: email,
            password: password
        }

        axios.post('http://127.0.0.1:5000/signup/validate/', user_data)
            .then(response => {

                console.log(response.data, 'login validate')

                localStorage.setItem("Bearer", response.data.access_token)
                localStorage.setItem("vaild_user", true)
                localStorage.setItem("refresh_token", response.data.refresh_token)

                if (response.data.status === false) setError(response.data.message)

                else {

                    setview(true)
                    if (response.data.userdata.admin === true) {

                        setAdmin(true)
                        navigate('/dash')

                    }
                    else {

                        setAdmin(false)
                        navigate('/orgchef/')
                    }



                }

            })
            .catch(error => console.log(error))
    }


    useEffect(() => {

        const fetchToken = async () => {

            const refresh_token = localStorage.getItem("refresh_token")

            console.log("logging")

            axios.post('http://127.0.0.1:8001/user/token/', { refresh_token: refresh_token })
                .then(response => {

                    localStorage.getItem('Bearer', response.data.access_token)

                })
                .catch(error => console.log(error))

        }

        fetchToken()
        setInterval(fetchToken, 30000)

    }, [])

    return (

        <div className='back' style={{paddingLeft:"20rem"}}>



            <div className='logg'>

                <h3 className='text-center' style={{color:""}}>Login</h3>

                <form action="">

                    <label  style={{color:""}}>Username :</label>
                    <input type="text" className='form-control inp' placeholder='enter your email' value={email} onChange={event => setEmail(event.target.value)} />

                    <label style={{color:""}}>Password : </label>  <br />
                    <input type="password" className='form-control inp' placeholder='password' value={password} onChange={event => setPassword(event.target.value)} /> <br />

                    <p style={{ color:"red" }}>{error}</p>

                    <button type='button' className='btn logbut' onClick={submitdata}>Login</button>
                    <br /> <br />
                    <NavLink className={"nav-link signup"} to={'/signup'} target='_self'><u>Don't have an account ? sign Up</u></NavLink>


                </form>

            </div>
        </div>

    )
}

export default Login