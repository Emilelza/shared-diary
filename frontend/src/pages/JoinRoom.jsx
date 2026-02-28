import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createRoom, joinRoom } from '../api'

export default function JoinRoom() {
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

const handleCreate = async () => {
    if (!name.trim()) return alert('Please enter your name')
    setLoading(true)
    try {
      const data = await createRoom(name)
      console.log('Room data:', data)  // add this line
      localStorage.setItem('userName', name)
      localStorage.setItem('roomCode', data.pair.room_code)
      localStorage.setItem('pairId', data.pair.id)
      navigate(`/diary/${data.pair.room_code}`)
    } catch (err) {
      alert('Error creating room. Is the backend running?')
    }
    setLoading(false)
  }

  const handleJoin = async () => {
    if (!name.trim() || !code.trim()) return alert('Please fill in both fields')
    setLoading(true)
    try {
      const data = await joinRoom(code.toUpperCase(), name)
      if (data.error) return alert('Room not found!')
      localStorage.setItem('userName', name)
      localStorage.setItem('roomCode', code.toUpperCase())
      localStorage.setItem('pairId', data.pair.id)
      navigate(`/diary/${code.toUpperCase()}`)
    } catch {
      alert('Error joining room. Is the backend running?')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm border border-amber-100">
        <div className="text-4xl mb-4 text-center">📔</div>
        <h1 className="text-2xl font-bold text-amber-900 text-center mb-2">Reverie</h1>
        <p className="text-amber-600 text-center text-sm mb-6 italic">Feel close, from far away 🌸</p>
        <label className="text-sm text-amber-800 font-medium">Your name</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Priya"
          className="w-full border border-amber-200 rounded-lg p-3 mb-4 mt-1 focus:outline-none focus:ring-2 focus:ring-amber-300"
        />
        <label className="text-sm text-amber-800 font-medium">Room code (to join existing)</label>
        <input
          value={code}
          onChange={e => setCode(e.target.value.toUpperCase())}
          placeholder="e.g. 123456"
          maxLength={6}
          className="w-full border border-amber-200 rounded-lg p-3 mb-6 mt-1 focus:outline-none focus:ring-2 focus:ring-amber-300"
        />
        <button
          onClick={handleJoin}
          disabled={loading}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-lg p-3 font-semibold transition-colors mb-3"
        >
          {loading ? 'Joining...' : 'Join existing diary →'}
        </button>
        <button
          onClick={handleCreate}
          disabled={loading}
          className="w-full bg-white border border-amber-400 hover:bg-amber-50 text-amber-700 rounded-lg p-3 font-semibold transition-colors"
        >
          {loading ? 'Creating...' : 'Create new diary ✨'}
        </button>
      </div>
    </div>
  )
}