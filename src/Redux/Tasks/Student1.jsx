import React, { useEffect, useState } from 'react'
import { addstudent } from '../slices/stuslice.js'
import { useDispatch } from 'react-redux'


const Student1 = () => {

    const [studentdata, setStudentdata] = useState('')
    const studispatch = useDispatch()


    const submithandler = (event) => {

        event.preventDefault()
        studispatch(addstudent(studentdata))
        setStudentdata("")
    }

    useEffect(() => {

        console.log(studentdata)
    }, [studentdata])


    return (

        <div>
            <input type="text" value={studentdata} onChange={event => setStudentdata(event.target.value)} />&nbsp;
            <input type="submit" onClick={event => submithandler(event)} />



        </div>
    )
}

export default Student1