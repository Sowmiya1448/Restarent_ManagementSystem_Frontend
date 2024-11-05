import React, { useState,useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'

import Empadd from './components/employee/Empadd'
import EmpList from './components/employee/EmpList'
import Role from './components/empRole/Role'
import EmpUdate from './components/employee/EmpUdate'
import Home from './components/home/Home'
import Foodcategory from './components/food category/Foodcategory'
import Attendance from './components/Attendance/Attendance'
import Salary from './components/salary/Salary'
import DashBoard from './components/Dashboard/DashBoard'
import Menulist from './components/Menuitems/Menulist'
import Addmenu from './components/Menuitems/Addmenu'
import Updatemenu from './components/Menuitems/Updatemenu'
import Order from './components/orders/Order'
import Table from './components/Tables/Table'
import Addtable from './components/Tables/Addtable'
import Updatetable from './components/Tables/Updatetable'
import CategoryView from './components/food category/CategoryView'
import Empview from './components/empRole/Empview'
import BillList from './components/Bill/BillList'
import Billview from './components/Bill/Billview'
import Login from './components/Loginpage/Login'
import Signup from './components/Loginpage/Signup'
import Billupdate from './components/Bill/Billupdate'
import Paybill from './components/Bill/Paybill'
import Paybillview from './components/Bill/Paybillview'
import Chef from './components/chef/Chef'
import Orgchef from './components/chef/Orgchef'


const App = () => {

  const[view ,setView] = useState(false)

  const[admin,setAdmin] = useState(false)

  const[vaild_user,setValiduser] = useState(false)


  useEffect(() =>{

          if(localStorage.getItem('vaild_user') !== null)  setValiduser(true)

  })

    return (
        <div>

            {view === true && <Home setview={setView} setAdmin={setAdmin} admin={admin}></Home>}

            
      
           <Routes>

                <Route path='/' element={<Login setview={setView} setAdmin ={setAdmin}/>} />
                <Route path='/signup/' element={<Signup/>}/>

                <Route path='/dash/' element={<DashBoard />} />
                <Route path='/emp' element={<EmpList />} />
                <Route path='/empadd/' element={<Empadd />} />
                <Route path='/empupdate/:id/' element={<EmpUdate />} />
                <Route path='/emprole/' element={<Role />} />
                <Route path='/foodcategory/' element={<Foodcategory />} />
                <Route path='/attendance/' element={<Attendance />} />
                <Route path='/salary/' element={<Salary />} />
                <Route path='/menu/' element={<Menulist />} />
                <Route path='/addmenu/' element={<Addmenu />} />
                <Route path='/updatemenu/:id/' element={<Updatemenu />} />
                <Route path='/orders/' element={<Order />} />
                <Route path='/table/' element={<Table />} />
                <Route path='/addtable/' element={<Addtable />} />
                <Route path='/updatetable/:id/' element={<Updatetable />} />
                <Route path='/catview/:id/' element={<CategoryView />} />
                <Route path='/empview/:id/' element={<Empview />} />
                <Route path='/bill/' element={<BillList />} />
                <Route path='/billview/:id/' element={<Billview />} />
                <Route path='/billupdate/:id/' element={<Billupdate/>}/>
                <Route path='/allbills/' element={<Paybill/>}/>
                <Route path='/paidbillview/:id/' element={<Paybillview/>}/>
                <Route path='/chef/' element={<Chef/>}/>
                <Route path="/orgchef/" element={<Orgchef/>}/> 

            </Routes>
         
        </div>
    )
}

export default App