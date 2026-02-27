import { BrowserRouter, Routes, Route } from 'react-router-dom'
import JoinRoom from './pages/JoinRoom'
import DiaryFeed from './pages/DiaryFeed'
import MomentsPage from './pages/MomentsPage'
import DateIdeasPage from './pages/DateIdeasPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JoinRoom />} />
        <Route path="/diary/:roomCode" element={<DiaryFeed />} />
        <Route path="/diary/:roomCode/moments" element={<MomentsPage />} />
        <Route path="/diary/:roomCode/ideas" element={<DateIdeasPage />} />
      </Routes>
    </BrowserRouter>
  )
}