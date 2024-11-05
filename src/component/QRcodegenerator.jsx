import React, { useState } from 'react'
import QRCode from 'react-qr-code'

const QRcodegenerator = () => {

    const[text,setText] = useState('');


  return (

    <div style={{textAlign:'center' , padding:'20px'}}>
       <h2>QR CODE GENERATOR</h2>
       <input type='text'
        placeholder='enter text or URL' 
        value={text}
        onChange={(e) =>setText(e.target.value)} 
       style={{padding:'10px',width:'300px',fontSize:'16px'}}>
       
       </input>

       <div style={{marginTop:"20px"}}>
        {text && (
            <QRCode value={text} 
            size={256} 
            bgColor='#ffffff' 
            fgColor='#00000'> 
            </QRCode>
        )}

       </div>

</div>
  )
}

export default QRcodegenerator