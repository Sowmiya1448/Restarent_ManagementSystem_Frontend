import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/laptop.css'
import axios from 'axios'

const Addstu = () => {

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [rollno, setRollno] = useState("")
    const [age, setAge] = useState("")
    const [std, setStd] = useState("")
    const [exam, setExam] = useState("")

    const [tamil, setTamil] = useState(0)
    const [eng, setEng] = useState(0)
    const [maths, setMaths] = useState(0)
    const [science, setScience] = useState(0)
    const [social, setSocial] = useState(0)

    const [total, setTotal] = useState(0)
    const [result, setResult] = useState(" ")
    const [avg, setAvg] = useState(" ")
    const [grade, setGrade] = useState(" ")


    useEffect(() => {

        const calculate = {
            tamil,
            eng,
            maths,
            science,
            social
        }
        axios.post('http://127.0.0.1:8001/student/total/', calculate)
            .then(response => {
                console.log(response.data)
                setTotal(response.data.tot)
                setAvg(response.data.avg)
                setResult(response.data.res)
                setGrade(response.data.grade)
            })
            .catch(error => console.log(error))
    }, [tamil, eng, maths, science, social])


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

        axios.post('http://127.0.0.1:8001/student/add/', data)
            .then(response => {
                console.log(response.data)
                navigate('/stu')
            })
            .catch(error => console.log(error))

    }

    // useEffect(()=>{

    // setTotal(Number(tamil)+Number(eng)+Number(maths)+Number(science)+Number(social))
    // setAvg(total/5)
    // setResult(markresult)
    // setGrade(markgrade)
    // },[tamil,eng,maths,science,social,avg,result,grade])


    // const markresult =()=>{

    //     if(tamil>=40 && eng>=40 && maths>=40 && science>=40 && social>=40)  setResult("pass")

    //     else setResult("Fail")
    // }

    // const markgrade =() =>{

    //         if(result==="pass"){

    //         if(avg>=90) setGrade("o")

    //         else if(avg>=80) setGrade("A+")

    //         else if(avg>=70) setGrade("A")

    //          else if(avg>=60) setGrade("B+")

    //         else if(avg>=50) setGrade("B")

    //        else if(avg>=40) setGrade("C")
    //        }
    //     else{
    //             setGrade("F")
    //         }
    //     }

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


                    <input type="text" className='form-control' value={total} /><br />

                    <input type="text" className='form-control' value={avg} onChange={event => setAvg(event.target.value)} /> <br />

                    <input type="text" className='form-control' value={result} onChange={event => setResult(event.target.value)} /><br />

                    <input type="text" className='form-control' value={grade} onChange={event => setGrade(event.target.value)} /><br />

                    <input type="submit" className='btn btn-info form-control' onClick={(event) => submitHandle(event)} />

                </form>

            </div>


        </div>
    )
}


export default Addstu