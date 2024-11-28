import CalendarUI from './fileUpload/CalendarUI';
import Event from './fileUpload/Event';
import FileUpload from './fileUpload/FileUpload';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FileUpload />}/>
        <Route path="/calendarUI" element={<CalendarUI />}/>
        <Route path="/event" element={<Event />}/>



          
      </Routes>
    </BrowserRouter>
  );
}

export default App;
