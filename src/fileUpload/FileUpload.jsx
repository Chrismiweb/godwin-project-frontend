import React, { useState } from 'react'

function FileUpload() {
    const[file, setFile] = useState("")

    async function uploadFile() {
        const baseUrl = 'http://localhost:2000/upload'
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({file})

        })
        .then(res =>res.json())
        if(response){
            console.log("file uploaded succesfully");
            
        }

    }
  return (
    <div>
        <input type="file"/>
        <button>Upload file</button>
    </div>
  )
}

export default FileUpload
