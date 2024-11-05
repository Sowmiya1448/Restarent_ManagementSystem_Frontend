import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Stuinfo = () => {

    const [api, setApi] = useState([])
    const [selectId, setSelectId] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {

        axios.get("http://127.0.0.1:8001/student/all")
            .then(response => {
                console.log(response.data)
                setApi(response.data)
            })
            .catch(error => console.log(error));
    }, [])


    let res = api.length > 0 ? api.map((data, index) => {
        return (
            <tr key={data._id}>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.rollno}</td>
                <td>{data.age}</td>
                <td>{data.className}</td>
                <td>{data.exam}</td>
                <td>{data.tamil}</td>
                <td>{data.english}</td>
                <td>{data.maths}</td>
                <td>{data.science}</td>
                <td>{data.socialscience}</td>
                <td>{data.total}</td>
                <td>{data.average}</td>
                <td>{data.result}</td>
                <td>{data.grade}</td>
                <td><button className='btn btn-info' onClick={() => navigate(`/update/${data._id}/`)}>Update</button></td>
                <td><button className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setSelectId(data)}>Delete</button></td>
            </tr>

        )
    }
    ) : <tr>
        <td colSpan={15} className='text-center'>No data Found</td></tr>


    const deleteHandle = () => {

        axios.delete(`http://127.0.0.1:8001/student/delete/${selectId._id}/`)
            .then(response => {
                console.log(response.data)

                let duplicate = [...api]
                duplicate.splice(api.findIndex(stu => stu._id === selectId._id), 1)
                setApi(duplicate)

                navigate('/stu/')

            })
            .catch(error => console.log(error));


    }


    return (
        <div>
            <h2 style={{ textAlign: "center" }}>STUDENT MARKSHEET</h2>

            <div className='container-fluid'>
                <button className='btn btn-info float-end' onClick={() => navigate('/addstu')}>+Addstudent</button>
                <br /><br />
            </div>
            <div className='container-fluid'>

                <table className='table table-bordered' style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Name</th>
                            <th>Rollno</th>
                            <th>Age</th>
                            <th>Class</th>
                            <th>Exam</th>
                            <th>Tamil</th>
                            <th>English</th>
                            <th>Maths</th>
                            <th>Science</th>
                            <th>Social</th>
                            <th>Total</th>
                            <th>Average</th>
                            <th>Result</th>
                            <th> Grade</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {res}
                    </tbody>
                </table>
            </div>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Delete</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete {selectId.name} ,{selectId.rollno}?</p>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={deleteHandle}>delete</button>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Stuinfo