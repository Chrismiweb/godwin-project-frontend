import React, { useState, useEffect } from 'react'
import { DatePicker, message, Space, Spin } from 'antd';



function Event() {
const { RangePicker } = DatePicker;


// usestates
const [title, setTitle] = useState("")
const [description, setDescription] = useState("")
const [isLoading, setIsLoading] = useState(false)
const [eventList, setEventList] = useState([])



//create new events api fetching
async function createEvent(){
    setIsLoading(true)
    const baseUrl = "http://localhost:2000/createEvent"

    try {
        const response = await fetch(baseUrl,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title, description})
        }) 
        .then(res =>res.json())
        if(response){
            console.log("event created successfully")
            message.success("event created successfully")
            setIsLoading(false)

        }
    } catch (error) {
        console.log(error)
        message.error("Unable to create event")
    }
}


// display all event 
async function displayEvent(){
    const displayUrl = "http://localhost:2000/getEvents"

    try {
        const displayResponse =  await fetch(displayUrl)
        const result = await displayResponse.json();
        const allEvent = result.allEvents;
        setEventList(allEvent);
        console.log(allEvent)
    } catch (error) {
        console.log(error)
    }

}


useEffect(() => {
    displayEvent()
}, [title, description])

  return (
    <div className='flex flex-col w-full py-[30px] justify-center items-center'>
        <div className='flex flex-col justify-center items-center w-[100%] gap-2'>
            <p className='text-[20px] font-bold'>EVENT CREATION</p>
            <input name={title} value={title} onChange={(e)=>setTitle(e.target.value)} className='p-[10px] w-[80%]  md:w-[30%] bg-slate-200' type="text" placeholder='Event Title'  id="" />
            <textarea name={description} value={description} onChange={(e)=>setDescription(e.target.value)} className='p-[10px] w-[80%]  md:w-[30%] bg-slate-200' type="text" placeholder='Desciption' id="" />
            {/* <RangePicker/> */}
            <button onClick={createEvent} className='p-[10px] mb-[30px] bg-black text-white'>{isLoading ? <Spin/> : "Create Event"}</button>
        </div>

        {
            eventList && eventList.length > 0 ? (
                <div className='md:flex-wrap  flex-col flex md:grid md:grid-cols-4 justify-center items-center w-[100%] gap-[20px]'>
                    {eventList.map((e, index)=>(
                        <div className='bg-slate-500 md:w-[95%] w-[80%] p-[20px]' key={index}>
                            <p><span className='font-bold text-orange-900'>Event Title:</span> {e.title}</p>
                            <p><span className='font-bold text-orange-900'>Event Description:</span> {e.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <p className='font-bold'>No Event have been created yet</p>
                </div>
            )
        }
      
    </div>
  )
}

export default Event
