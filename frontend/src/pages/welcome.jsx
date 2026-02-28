import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createRoom, joinRoom } from '../api'

export default function Welcome() {
  const [screen, setScreen] = useState('loading')
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [returningUser, setReturningUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const savedName = localStorage.getItem('userName')
    const savedRoom = localStorage.getItem('roomCode')
    const savedPairId = localStorage.getItem('pairId')
    if (savedName && savedRoom && savedPairId) {
      setReturningUser({ name: savedName, roomCode: savedRoom })
      setScreen('returning')
    } else {
      setScreen('new')
    }
  }, [])

  const saveToHistory = (roomCode, userName) => {
    const history = JSON.parse(localStorage.getItem('roomHistory') || '[]')
    const exists = history.find(r => r.roomCode === roomCode)
    if (!exists) {
      history.push({ roomCode, name: userName, date: new Date().toISOString() })
      localStorage.setItem('roomHistory', JSON.stringify(history))
    }
  }

  const handleCreate = async () => {
    if (!name.trim()) return alert('Please enter your name')
    setLoading(true)
    try {
      const data = await createRoom(name)
      const id = data.pair?.id || data.id
      const roomCode = data.pair?.room_code || data.room_code
      localStorage.setItem('userName', name)
      localStorage.setItem('roomCode', roomCode)
      localStorage.setItem('pairId', id)
      saveToHistory(roomCode, name)
      navigate(`/diary/${roomCode}`)
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
      const id = data.pair?.id || data.id
      localStorage.setItem('userName', name)
      localStorage.setItem('roomCode', code.toUpperCase())
      localStorage.setItem('pairId', id)
      saveToHistory(code.toUpperCase(), name)
      navigate(`/diary/${code.toUpperCase()}`)
    } catch (err) {
      alert('Error joining room. Is the backend running?')
    }
    setLoading(false)
  }

  const handleContinue = () => {
    navigate(`/diary/${returningUser.roomCode}`)
  }

  const handleSwitch = () => {
    localStorage.clear()
    setScreen('new')
  }

  if (screen === 'loading') return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center">
      <div className="text-4xl animate-pulse">📔</div>
    </div>
  )

  if (screen === 'returning') return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm border border-amber-100 text-center">
        <div className="text-5xl mb-4">📔</div>
        <h1 className="text-2xl font-bold text-amber-900 mb-2">Welcome back!</h1>
        <p className="text-amber-600 text-lg mb-1">
          {returningUser.name} 🌸
        </p>
        <p className="text-amber-400 text-sm mb-8">
          Room: {returningUser.roomCode}
        </p>
        <button
          onClick={handleContinue}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-xl p-4 font-semibold text-lg transition-colors mb-3"
        >
          Continue to diary →
        </button>
        <button
          onClick={handleSwitch}
          className="w-full text-amber-400 hover:text-amber-600 text-sm transition-colors"
        >
          Switch account
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm border border-amber-100">
        <div className="text-4xl mb-4 text-center">📔</div>
        <h1 className="text-2xl font-bold text-amber-900 text-center mb-2">Shared Diary</h1>
        <p className="text-amber-600 text-center text-sm mb-6 italic">A private space for two 🌿</p>

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