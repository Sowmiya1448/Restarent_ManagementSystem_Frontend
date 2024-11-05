import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { del, updates } from '../slices/stuslice.js'

const Stu2 = () => {
    const stu_details = useSelector((state) => state.studentdata)
    const [stu, setStu] = useState([...stu_details])
    const stu_dispatch = useDispatch()
   

    const changedata = (event, index) => {
        const newdata = [...stu]
        newdata[index] = event.target.value
        setStu(newdata)
       stu_dispatch(updates({ key: index, value: event.target.value }))
    }

    let res =stu_details.map((data,index) => {
        return (
            <div key={index}>

            <br />
                <input type="text" value={stu[index]} onChange={(event) =>changedata(event, index)}/>&nbsp;
                <button onClick={() =>stu_dispatch(del(index))}>X</button>
             <br />

            </div>
        )
    })

return (
    <div>

    {res}

      </div>
    )
}

export default Stu2