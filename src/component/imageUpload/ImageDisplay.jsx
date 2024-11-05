import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ImageDisplay = ({source}) => {
  
    return (
        <div>
            {source.length > 0 && <img src={source} alt="Converted" style={{ maxWidth: '300px' }} />}
        </div>
    )
}

export default ImageDisplay