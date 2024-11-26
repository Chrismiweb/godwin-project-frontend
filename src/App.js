import CalendarUI from './fileUpload/CalendarUI';
import FileUpload from './fileUpload/FileUpload';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FileUpload />}/>
        <Route path="/calendarUI" element={<CalendarUI />}/>


          
      </Routes>
    </BrowserRouter>
  );
}

export default App;
