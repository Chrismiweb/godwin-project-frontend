import React, { useState } from 'react'

function FileUpload() {
    const[file, setFile] = useState(null)
    const[preview, setPreview] = useState("")

    async function uploadFile(e) {
        e.preventDefault()

        // formdata upload
        const formData = new FormData()
        formData.append("fileName", file)
        setPreview(URL.createObjectURL(file))
        const baseUrl = 'http://localhost:2000/upload'
        // fetch request from the server
       try {
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: formData
            })
            .then(res =>res.json())
            if(response.ok){
                alert("file uploaded successfully")         
            }
            // catch any error seen
       } catch (error) {
            console.log(error)
       }
    }
    const fileUpload =(e)=>{
        const file = e.target.files[0];
        if(file){
            setFile(file)
        }
    }
  return (
    <div className='flex flex-col gap-2 h-screen w-full bg-orange-900 justify-center items-center'>
        <input onChange={fileUpload} name = "fileName" type="file"/>
        <button className='p-[10px] bg-black text-white' onClick={uploadFile}>Upload file</button>
        {
            preview ? (
                <div className='w-[100%] flex justify-center items-center'>
                    <img src={preview} className='w-[30%] h-[200px]' alt="" />
                </div>
            )
            : (
                <div>
                    no file uploaded yet
                </div>
            )
        }
    </div>
  )
}

export default FileUpload
