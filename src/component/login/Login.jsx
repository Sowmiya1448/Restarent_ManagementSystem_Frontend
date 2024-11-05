import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ setview }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const [error, setError] = useState('')

    const submitdata = event => {

        event.preventDefault()
        console.log(username, password)

        const user_data = {

            username: username,
            password: password
        }

        axios.post('http://127.0.0.1:8001/user/validate/', user_data)
            .then(response => {

                console.log(response.data)

                localStorage.setItem("Bearer", response.data.access_token)
                localStorage.setItem("vaild_user", true)
                localStorage.setItem("refresh_token", response.data.refresh_token)

                if (response.data.status === false) setError(response.data.message)
                else {

                    navigate('/laptop')
                    setview(true)

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


        <div>

            <h2 className='text-center'>LOGIN PAGE</h2> <br /> <br />

            <form className='form-control cont'>


                <label htmlFor="">Username :</label>
                <input type="text" className='form-control' value={username} onChange={event => setUsername(event.target.value)} />


                <label htmlFor="">password :</label>
                <input type="password" className='form-control' value={password} onChange={event => setPassword(event.target.value)} /> <br />

                <p style={{ color: "red" }}>{error}</p>


                <input type="submit" className='btn btn-info form-control' onClick={submitdata} />
            </form>
        </div>
    )
}

export default Login