import React, { useEffect, useState } from 'react'
import Navbar from './component/Navbar'
import { Route,Routes } from 'react-router-dom'

import LaptopList from './component/laptop/LaptopList'
import Laptopadd from './component/laptop/Laptopadd'
import LaptopUpdate from './component/laptop/LaptopUpdate'
import Bill from './component/Bill/Bill'
import Bill_list from './component/Bill/Bill_list'
import View from './component/Bill/View'
import Bill_update from './component/Bill/Bill_update'
import Category from './component/category/Category'
import Customerlist from './component/customer/Customerlist'
import Addcustomer from './component/customer/Addcustomer'
import Customer_update from './component/customer/Customer_update'
import Stock from './component/stock/Stock'
import Stock_list from './component/stock/Stock_list'
import Addstock from './component/stock/Addstock'
import Login from './component/login/Login'
import Updatestock from './component/stock/Updatestock'
import Paymentlist from './component/payment/Paymentlist'
import Pay from './component/payment/Pay'

import  {store} from './Redux/store'
import { Provider } from 'react-redux'


const App = () => {

  const[view ,setView] =useState(false)

  const[vaild_user,setValiduser] = useState(false)


  useEffect(() =>{

          if(localStorage.getItem('vaild_user') !== null)  setValiduser(true)

  })

  return (


    <div>

      <Provider store={store}>
      {view === true && <Navbar setview ={setView}></Navbar>}
       <Navbar/>
       <Routes>
       <Route path='/' element={<Login setview = {setView}/>}/>

       



        <Route path='/add' element={ <Laptopadd/>}/>
        <Route path='/laptop' element={ <LaptopList/>}/>
        <Route path='/lap/update/:id' element={<LaptopUpdate/>}/> 
        <Route path='/bill' element={<Bill/>} ></Route>
        <Route path='/bill_list' element={<Bill_list/>}></Route>
        <Route path='/view/:id' element={<View/>}></Route>
        <Route path='/billupdate/:id' element={<Bill_update/>}></Route>
        <Route path='/category' element={<Category/>}></Route>
        <Route path='/customer' element={<Customerlist/>}/>
        <Route path='/addcustomer' element={<Addcustomer/>}/>
        <Route path='/customerupdate/:id' element={<Customer_update/>}/>
        <Route path='/stock' element={<Stock/>}/>
        <Route path='/stocklist' element={<Stock_list/>}/>
        <Route path='/addstock/:id/' element={<Addstock/>}/>
        <Route path='/updatestock/:id/' element={<Updatestock/>}/>
        <Route path='/payment/' element={<Paymentlist/>}/>
        <Route path='/pay/:id' element={<Pay/>}/>
       

  </Routes>
  </Provider>
        
    </div>
  

  )
}

export default App