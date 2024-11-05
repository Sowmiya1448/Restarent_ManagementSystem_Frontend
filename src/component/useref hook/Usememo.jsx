import React, { useMemo, useState } from 'react'

const Usememo = () => {


    const[count,setCount] = useState(0)
   
    
    
    const calculation = useMemo(() =>
    {

        let result = 0

        for(let i=0 ;i< 100000 ;i++)
        {
            result = result+i
        }

        return result

    },[])




  return (
    <div>

 <h1>result :{calculation}</h1>
 <button onClick={() =>setCount(count+1)}>Increment count:{count}</button>



    </div>
  )
}

export default Usememo