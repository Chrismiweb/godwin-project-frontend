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
    <div className='flex  flex-col gap-2 h-full py-[50px] w-full  justify-center items-center'>
        <div className='flex flex-col gap-2'>
            <a href="/calendarUI">
                <button className='p-[10px] bg-black text-white'>Calendar and Pomodor Timer </button>
            </a>
            <a href="/event">
                <button className='p-[10px] bg-black text-white'>Create New Event  </button>
            </a>
        </div>
        <p className='text-[15px] font-bold mt-[30px]'>FILE UPLOAD TESTING</p>
        <p className='text-[12px] '>Choose a file before uploading</p>
        <input onChange={fileUpload} name ="fileName" type="file"/>
        <button className='p-[10px] bg-black text-white' onClick={uploadFile}>Upload file</button>
        {preview && (
                <div>
                    <p>File Preview:</p>
                    {file.type.startsWith("image/") ? (
                        <img src={preview} alt="Preview" className='w-[100px] h-[100px]' />
                    ) : file.type === "application/pdf" ? (
                        <embed
                            src={preview}
                            type="application/pdf"
                            width="400"
                            height="500"
                        />
                    ) : (
                        <a
                            href={preview}
                            download={file.name}
                            className='text-blue-500 underline'
                        >
                            Download {file.name}
                        </a>
                    )}
                </div>
            )}
    </div>
  )
}

export default FileUpload
