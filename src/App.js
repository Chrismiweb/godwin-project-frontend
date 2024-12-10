import CalendarUI from './fileUpload/CalendarUI';
import Event from './fileUpload/Event';
import FileUpload from './fileUpload/FileUpload';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VideoChat from './videoChat/VideoChat';

function App() {
  return (
<BrowserRouter>
  <Routes>
    <Route path="/" element={<FileUpload />} />
    <Route path="/calendarUI" element={<CalendarUI />} />
    <Route path="/event" element={<Event />} />
    <Route path="/videoChat" element={<VideoChat />} />
    <Route path="/videoChat/join/:id" element={<VideoChat />} />
  </Routes>
</BrowserRouter>
  );
}

export default App;
