import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../home/Home.css'
import axios from 'axios'
import dash from '../images/dashboard.png'
import order from '../images/order-food.png'
import chef from '../images/chef.png'
import bill from '../images/bill.png'
import menu from '../images/menu.png'
import love from '../images/love.png'
import smily from '../images/smily.png'


const Home = ({ setview,admin }) => {

    const navigate = useNavigate()

    const userlogout = () => {


        const data = {

            refresh_token: localStorage.getItem("refresh_token")
        }

        axios.post('http://127.0.0.1:5000/signup/logout/', data)

            .then(response => {

                console.log(response.data)

                localStorage.clear()

                navigate('/')

                setview(false)

            })
            .catch(error => console.log(error))

    }


    return (

        <div>
        <header className={admin ? 'admin':'chef'}>
                <nav>
                    <ul>
                       
                       {!admin ? <>

                    <div> 
    
                           <li>
                                <NavLink className={"nav-link"} to={'/orgchef/'}>Chef page</NavLink>
                            </li>
                         </div>

                        </>
                            : <>
                                <li className='dash'>
                                    <NavLink className={"nav-link"} to={'/dash/'}>Dashboard</NavLink>
                                </li>

                                 <li>
                                    <NavLink className={"nav-link"} to={'/orders/'}>Order</NavLink>
                                </li>

                                <li>
                                    <NavLink className={"nav-link"} to={'/chef/'}>Chef</NavLink>
                                </li>

                                <li>
                                    <NavLink className={"nav-link"} to={'/bill/'}> Bills</NavLink>
                                </li>

                                
                                <li>
                                    <NavLink className={"nav-link"} to={'/foodcategory/'}>Food Category</NavLink>
                                </li>

                                <li>
                                    <NavLink className={"nav-link"} to={'/menu/'}>Menu management</NavLink>
                                </li>


                                <li>
                                    <NavLink className={"nav-link"} to={'/emprole'}>EmpRoles</NavLink>
                                </li>

                                <li >
                                    <NavLink className={"nav-link"} to={'/emp'}>EmployeeList</NavLink>
                                </li>

                                <li>
                                    <NavLink className={"nav-link"} to={'/table/'}>Tables</NavLink>
                                </li>


                                <li>
                                    <NavLink className={"nav-link"} to={'/attendance/'}>Attendance</NavLink>
                                </li>

                                <li>
                                    <NavLink className={"nav-link"} to={'/salary/'}>Salary</NavLink>
                                </li>


                                <li>
                                    <NavLink className={"nav-link"} to={'/allbills/'}>All Bills</NavLink>
                                </li>
                            </>

                        }




                    </ul>
                </nav>
            </header>
         
         {admin ? <>
         
                      <div className='log'  style={{paddingLeft:"20rem"}}>

                        <h3 className='text'> Welcome with Your Sweet Talk </h3>
                        <button className='btn btn-warning' onClick={userlogout}>LOGOUT</button>
                        </div> 
                  </> :
                  
                  <div className='logy'>

                  <h3 className='text'>" Cooking is love <img src={love} alt="" height={"30px"} width={"30px"} /> made visible; put your heart into every bite."</h3>
                  <button className='btn btn-warning' onClick={userlogout}>LOGOUT</button>
                  </div> 
                  }

   

        </div>
    )
}

export default Home