import React from 'react'


const ImageDisplay = ({source}) => {
  
    return (
        <div>
            {source.length > 0 && <img src={source} alt="Converted" style={{height:"100px", width:"100px"}} />}
        </div>
    )
}

export default ImageDisplay