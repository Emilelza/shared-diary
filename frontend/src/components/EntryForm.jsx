import { useState } from 'react'
import { postEntry } from '../api'

const MOODS = ['😊','😢','😍','🥰','😤','🌧️','✨','🌸','☀️']

export default function EntryForm({ roomCode, userName, onNewEntry, pairId }) {
  const [text, setText] = useState('')
  const [mood, setMood] = useState('😊')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!text.trim()) return
    setLoading(true)
    try {
      const data = await postEntry(pairId, userName, text, mood)
      onNewEntry(data)
      setText('')
    } catch {
      alert('Error saving entry. Is the backend running?')
    }
    setLoading(false)
  }

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-amber-100">
      <p className="text-sm font-medium text-amber-800 mb-3">How are you feeling today?</p>
      <div className="flex gap-2 mb-3 flex-wrap">
        {MOODS.map(m => (
          <button
            key={m}
            onClick={() => setMood(m)}
            className={`text-xl p-1 rounded-lg transition-all ${mood === m ? 'bg-amber-100 scale-125' : 'hover:bg-amber-50'}`}
          >
            {m}
          </button>
        ))}
      </div>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Write something to remember..."
        rows={3}
        className="w-full border border-amber-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-300"
      />
      <button
        onClick={handleSubmit}
        disabled={loading || !text.trim()}
        className="mt-3 w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white rounded-lg p-3 text-sm font-semibold transition-colors"
      >
        {loading ? 'Saving...' : 'Save this memory 💛'}
      </button>
    </div>
  )
}