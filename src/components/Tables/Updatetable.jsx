import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Updatetable = () => {

    const navigate = useNavigate()

    const param = useParams()
    const { id } = param

    const [tabno, setTabno] = useState('')
    const [chair, setChair] = useState('')

    useEffect(() => {

        axios.get(`http://127.0.0.1:5000/table/${id}`)
            .then(response => {
              
                setChair(response.data.chairs)
                setTabno(response.data.tableno)
                
            })
            .catch(error => console.log(error))


    }, [])

    const submitHandle = (event) => {

        event.preventDefault()

        const data = {

            tableno: tabno,
            chairs: chair,
        }

        axios.patch(`http://127.0.0.1:5000/table/${id}`, data)
            .then(response => {
                console.log(response.data)
                navigate('/table')
            })
            .catch(error => console.log(error))


    }


    return (

        <div style={{paddingLeft:"20rem"}}>

            <h2 className='text-center head'>Update Table Data</h2>

            <div className='container-fluid'>

                <button className='btn btn-info float-end' onClick={() => navigate('/table/')}>Back</button> <br />
            </div>

            <div className='container-fluid' style={{ width: "30%" }}>
                <form className='form-control'>
                    <label>Tableno:</label>
                    <input type="Number" className='form-control' value={tabno} onChange={e => setTabno(e.target.value)} />

                    <label>chairs:</label>
                    <input type="Number" className='form-control' value={chair} onChange={e => setChair(e.target.value)} /> <br /> <br />

                    <input type="submit" className='btn btn-info form-control' onClick={(event) => submitHandle(event)} />


                </form>
            </div>

        </div>
    )
}

export default Updatetable