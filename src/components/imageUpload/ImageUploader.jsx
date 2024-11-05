import React, { useState } from 'react'
import axios from 'axios'
import ImageDisplay from './ImageDisplay'

const ImageUploader = () => {

    const [base64String, setBase64String] = useState('')
    const [image_source, setImageSource] = useState('')

    const handleImageChange = event => {

        const file = event.target.files[0]

        const reader = new FileReader()

        reader.onloadend = () => {

            const base64 = reader.result

            setBase64String(base64)
        }

        reader.readAsDataURL(file)
    }

  const Submit = () => {

    axios.post("http://127.0.0.1:5000/image/upload/", {image: base64String})
    .then(response => {
      
        setImageSource(response.data.image)
    })
    .catch(error => {})

  }

  return (

        <div>
            <h2>Upload a Image:</h2>

            <input type="file" accept="image/*" onChange={handleImageChange} />

            <input type="submit" onClick={Submit}/>

            <ImageDisplay source={image_source}></ImageDisplay>
        </div>

    )
}

export default ImageUploader