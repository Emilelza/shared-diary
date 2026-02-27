import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

const DATE_IDEAS = [
  { emoji: '🍳', idea: 'Cook the same recipe together over video call and eat at the same time!' },
  { emoji: '🎬', idea: 'Watch the same movie simultaneously and text each other reactions' },
  { emoji: '🌅', idea: 'Wake up early and watch the sunrise together on a video call' },
  { emoji: '📝', idea: 'Write each other a letter and read it aloud on a call' },
  { emoji: '🎮', idea: 'Play an online game together — chess, skribbl.io or Among Us!' },
  { emoji: '🎵', idea: 'Build a shared Spotify playlist — one song each, back and forth' },
  { emoji: '📸', idea: 'Photo challenge — same theme, different cities. Share in the diary!' },
  { emoji: '☕', idea: 'Have coffee together on a morning call — just sit and talk, no agenda' },
  { emoji: '📖', idea: 'Read the same book chapter and discuss it on a call' },
  { emoji: '🌙', idea: 'Have a late night call and look at the stars together' },
  { emoji: '🎨', idea: 'Draw each other from memory and share — no peeking!' },
  { emoji: '🧩', idea: 'Solve an online puzzle or quiz together' },
  { emoji: '💌', idea: 'Send a surprise care package with 5 things that remind you of them' },
  { emoji: '🍕', idea: 'Order the same food from different places and eat together on call' },
  { emoji: '🎤', idea: 'Karaoke night over video call — most embarrassing song wins!' },
]

export default function DateIdeasPage() {
  const { roomCode } = useParams()
  const navigate = useNavigate()
  const [current, setCurrent] = useState(DATE_IDEAS[0])
  const [animating, setAnimating] = useState(false)
  const [saved, setSaved] = useState([])

  const getNewIdea = () => {
    setAnimating(true)
    setTimeout(() => {
      let next
      do { next = DATE_IDEAS[Math.floor(Math.random() * DATE_IDEAS.length)] }
      while (next.idea === current.idea)
      setCurrent(next)
      setAnimating(false)
    }, 200)
  }

const saveIdea = () => {
    if (saved.find(s => s.idea === current.idea)) return
    setSaved(prev => [current, ...prev])
  }

  const deleteIdea = (idea) => {
    setSaved(prev => prev.filter(s => s.idea !== idea))
  }

  return (
    <div className="min-h-screen bg-rose-50 pb-24">

      {/* Header */}
      <div className="bg-rose-700 text-white p-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button onClick={() => navigate(`/diary/${roomCode}`)} className="text-rose-200 hover:text-white text-sm">
            ← Back
          </button>
          <h1 className="text-lg font-bold">🎲 Date Ideas</h1>
          <div className="w-12" />
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-6">

        {/* Idea Card */}
        <div className={`bg-white rounded-2xl p-8 text-center shadow-sm border border-rose-100 transition-opacity duration-200 ${animating ? 'opacity-0' : 'opacity-100'}`}>
          <div className="text-6xl mb-4">{current.emoji}</div>
          <p className="text-gray-700 leading-relaxed">{current.idea}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={getNewIdea}
            className="flex-1 bg-rose-400 hover:bg-rose-500 text-white rounded-xl p-3 text-sm font-semibold transition-colors"
          >
            🎲 New Idea
          </button>
          <button
            onClick={saveIdea}
            className={`flex-1 rounded-xl p-3 text-sm font-semibold transition-colors border
              ${saved.find(s => s.idea === current.idea)
                ? 'bg-amber-50 border-amber-200 text-amber-400'
                : 'bg-white border-rose-200 text-rose-500 hover:bg-rose-50'}`}
          >
            {saved.find(s => s.idea === current.idea) ? '✓ Saved' : '💛 Save Idea'}
          </button>
        </div>

        {/* Saved Ideas */}
        {saved.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-bold text-rose-700 mb-3">💛 Saved Ideas</p>
           {saved.map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 mb-2 border border-rose-100 flex gap-3 items-start shadow-sm">
            <span className="text-2xl">{s.emoji}</span>
            <p className="text-sm text-gray-600 flex-1">{s.idea}</p>
            <button
              onClick={() => deleteIdea(s.idea)}
              className="text-xs text-red-300 hover:text-red-500 transition-colors flex-shrink-0"
            >
              🗑️
            </button>
          </div>
        ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}