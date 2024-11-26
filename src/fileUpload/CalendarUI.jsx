import React from 'react'
import { DatePicker, Space } from 'antd';
import PomodoroTimer from './PomodoroTimer';
const { RangePicker } = DatePicker;


function CalendarUI() {
  return (
    <div className='bg-red-500 flex-col gap-[20px] h-screen w-[100%] flex justify-center items-center'>
        <RangePicker/>
        <PomodoroTimer/>
    </div>
  )
}

export default CalendarUI
