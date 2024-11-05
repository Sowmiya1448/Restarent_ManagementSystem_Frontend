import React, { useState ,useRef } from 'react'

const UseRef = () => {

    const[name,setName] = useState([])
    const[namelist,setNamelist] = useState([])
    const inputref = useRef(null)

    const handleclick =() =>{

        setNamelist([...namelist,name])
        setName('')
        inputref.current.focus()

}


 return (


    <div>
 <input type="text"  ref={inputref}   value={name} onChange={event =>setName(event.target.value)} />
 <button onClick={handleclick}> ADD</button>
 {
    namelist.map(n => <p>{n}</p>)
 }


    </div>
  )
}

export default UseRef