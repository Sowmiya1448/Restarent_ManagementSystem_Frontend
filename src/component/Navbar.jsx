import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Navbar = ({setview}) => {


    const navigate =useNavigate()


    const userlogout =() =>{


        const data = {

            refresh_token:localStorage.getItem("refresh_token")
        }

        axios.post('http://127.0.0.1:8001/user/logout/',data)
        .then(response => {

          console.log(response.data)

          localStorage.clear()
          
          navigate('/')  
          
          setview(false)

        })
        .catch(error =>console.log(error))

    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                 
                            <li className="nav-item">
                                <NavLink className={"nav-link"} to={'/laptop/'}>laptop</NavLink>
                            </li>

                            <li>
                                <NavLink className={'nav-link'} to={'/bill/'}>Bill</NavLink>
                            </li>

                            <li>
                                <NavLink className={'nav-link'} to={'/bill_list/'}>BillList</NavLink>
                            </li>


                            <li>
                                <NavLink className={'nav-link'} to={'/category/'}>category</NavLink>
                            </li>

                            <li>
                                <NavLink className={'nav-link'} to={'/customer/'}>Customer</NavLink>
                            </li>

                            
                            <li>
                                <NavLink className={'nav-link'} to={'/stock/'}>Stock</NavLink>
                            </li>

                            <li>
                                <NavLink className={'nav-link'} to={'/stocklist/'}>Stocklist</NavLink>

                            </li>

                           <li>
                                <NavLink className={'nav-link'} to={'/payment/'}>paymentlist</NavLink>

                            </li>

                            {/* <li>
                                <NavLink className={'nav-link'} to={'/'}>stu1</NavLink>

                            </li>

                            <li>
                                <NavLink className={'nav-link'} to={'/stu2/'}>stu2</NavLink>

                            </li> */}

                   

                            <button  onClick={userlogout}>LogOut</button>

                        </ul>
                    </div>
                </div>
            </nav>


        </div>
    )
}

export default Navbar