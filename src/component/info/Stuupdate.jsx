import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Stuupdate = () => {

    const navigate = useNavigate()

    const params = useParams()

    const { id } = params


    const [name, setName] = useState("")
    const [rollno, setRollno] = useState("")
    const [age, setAge] = useState("")
    const [std, setStd] = useState("")
    const [exam, setExam] = useState("")
    const [tamil, setTamil] = useState()
    const [eng, setEng] = useState()
    const [maths, setMaths] = useState()
    const [science, setScience] = useState()
    const [social, setSocial] = useState()
    const [total, setTotal] = useState(0)
    const [result, setResult] = useState("")
    const [avg, setAvg] = useState("")
    const [grade, setGrade] = useState("")

    useEffect(() => {

        axios.get(`http://127.0.0.1:8001/student/${id}/`)
            .then(response => {
                console.log(response.data)

                setName(response.data.name)
                setRollno(response.data.rollno)
                setAge(response.data.age)
                setStd(response.data.className)
                setExam(response.data.exam)
                setTamil(response.data.tamil)
                setEng(response.data.english)
                setMaths(response.data.maths)
                setScience(response.data.science)
                setSocial(response.data.socialscience)
                setTotal(response.data.total)
                setAvg(response.data.average)
                setResult(response.data.result)
                setGrade(response.data.grade)
            })
            .catch(error => console.log(error))
    }, [])

    const submitHandle = (event) => {
        event.preventDefault()

        const data = {
            name: name,
            rollno: rollno,
            age: age,
            className: std,
            exam: exam,
            tamil: tamil,
            english: eng,
            maths: maths,
            science: science,
            socialscience: social,
            total: total,
            average: avg,
            result: result,
            grade: grade
        }

        axios.patch(`http://127.0.0.1:8001/student/update/${id}`, data)
            .then(response => {
                console.log(response.data)
                navigate('/stu')
            })
            .catch(error => console.log(error))
    }


    useEffect(() => {

        setTotal(Number(tamil) + Number(eng) + Number(maths) + Number(science) + Number(social))
        setAvg(total / 5)
        setResult(markresult)
        setGrade(markgrade)


    }, [tamil, eng, maths, science, social, avg, result, grade])


    const markresult = () => {

        if (tamil > 40 && eng > 40 && maths > 40 && science > 40 && social > 40) {
            setResult("pass")
        }
        else {
            setResult("fail")
        }
    }

    const markgrade = () => {

        if (avg >= 90 && avg <= 100) setGrade("o")

        else if (avg >= 80 && avg <= 89) setGrade("A+")

        else if (avg >= 70 && avg <= 79) setGrade("B")

        else if (avg >= 60 && avg <= 69) setGrade("C")

        else if (avg >= 50 && avg <= 59) setGrade("D")

        else if (avg >= 40 && avg <= 49) setGrade("E")

        else {
            setGrade("F")
        }
    }





    return (
        <div>
            <h2 className='text-center'>ADD STUDENT MARKS</h2>
            <div className='container fluid'>
                <button className='btn btn-secondary float-end' onClick={() => navigate('/stu/')}>Back</button> <br /><br />
            </div>
            <div className='conatiner-fluid con'>

                <form action="" className='form-control'>

                    <label>Name:</label>
                    <input type="text" className='form-control' value={name} onChange={event => setName(event.target.value)} />

                    <label>Rollno:</label>
                    <input type="text" className='form-control' value={rollno} onChange={event => setRollno(event.target.value)} />

                    <label>Age:</label>
                    <input type="text" className='form-control' value={age} onChange={event => setAge(event.target.value)} />

                    <label>className:</label>
                    <input type="text" className='form-control' value={std} onChange={event => setStd(event.target.value)} />

                    <label>Exam:</label>
                    <select className='form-control' value={exam} onChange={event => setExam(event.target.value)}>
                        <option value="mid-term">mid-term</option>
                        <option value="quartely">quarterly</option>
                        <option value="half-yearly">half-yearly</option>

                    </select>

                    <label>Tamil:</label>
                    <input type="text" className='form-control' value={tamil} onChange={event => setTamil(event.target.value)} />

                    <label>English:</label>
                    <input type="text" className='form-control' value={eng} onChange={event => setEng(event.target.value)} />

                    <label>Maths:</label>
                    <input type="text" className='form-control' value={maths} onChange={event => setMaths(event.target.value)} />

                    <label>Science:</label>
                    <input type="text" className='form-control' value={science} onChange={event => setScience(event.target.value)} />

                    <label>Social:</label>
                    <input type="text" className='form-control' value={social} onChange={event => setSocial(event.target.value)} /> <br />


                    <input type="text" className='form-control' value={total} onChange={event => setTotal(event.target.value)} /><br />


                    <input type="text" className='form-control' value={avg} onChange={event => setAvg(event.target.value)} /> <br />


                    <input type="text" className='form-control' value={result} onChange={event => setResult(event.target.value)} /><br />

                    <input type="text" className='form-control' value={grade} onChange={event => setGrade(event.target.value)} /><br />

                    <input type="submit" className='btn btn-info form-control' onClick={(event) => submitHandle(event)} />

                </form>

            </div>



        </div>
    )
}

export default Stuupdate