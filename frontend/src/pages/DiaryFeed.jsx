import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import EntryCard from '../components/EntryCard'
import EntryForm from '../components/EntryForm'
import MemoryModal from '../components/MemoryModal'
import AnniversaryPopup from '../components/AnniversaryPopup'
import BottomNav from '../components/BottomNav'

const MOCK_ENTRIES = []


  const MOCK_MEMORY = null

export default function DiaryFeed() {
  const { roomCode } = useParams()
  const navigate = useNavigate()
  const userName = localStorage.getItem('userName') || 'You'
  const [entries, setEntries] = useState(MOCK_ENTRIES)
  const [memory] = useState(MOCK_MEMORY)
  const [showMemory, setShowMemory] = useState(true)
  const [anniversaryMoment, setAnniversaryMoment] = useState(null)

  // Check if any saved moment matches today's date
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`favMoments_${roomCode}`) || '[]')
    const today = new Date()
    const todayMMDD = `${today.getMonth()}-${today.getDate()}`
    const match = saved.find(m => {
      const d = new Date(m.date)
      return `${d.getMonth()}-${d.getDate()}` === todayMMDD
    })
    setAnniversaryMoment(match || null)
  }, [roomCode])

  const handleNewEntry = (entry) => {
    setEntries(prev => [entry, ...prev])
  }

  return (
    <div className="min-h-screen bg-amber-50 pb-24">

      {/* Header */}
      <div className="bg-amber-800 text-white p-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="text-amber-200 hover:text-white text-sm transition-colors"
          >
            ← Back
          </button>
          <div className="text-center">
            <h1 className="text-lg font-bold">📔 Our Diary</h1>
            <div className="text-xs opacity-75">Room: {roomCode} · {userName} 🌸</div>
          </div>
          <div className="w-12" />
        </div>
      </div>

      {/* Remember This Modal */}
      {showMemory && memory && !anniversaryMoment && (
        <MemoryModal memory={memory} onClose={() => setShowMemory(false)} />
      )}

      {/* Anniversary Popup */}
      {anniversaryMoment && (
        <AnniversaryPopup
          moment={anniversaryMoment}
          onClose={() => setAnniversaryMoment(null)}
        />
      )}

      {/* Entry Form */}
      <div className="max-w-lg mx-auto px-4 pt-4">
        <EntryForm roomCode={roomCode} userName={userName} onNewEntry={handleNewEntry} />
      </div>

      {/* Entries Feed */}
      <div className="max-w-lg mx-auto px-4 mt-4">
        {entries.length === 0 ? (
          <div className="text-center text-amber-400 italic mt-12">
            Write your first memory together 🌸
          </div>
        ) : (
          entries.map(entry => <EntryCard key={entry.id} entry={entry} />)
        )}
      </div>

      <BottomNav />
    </div>
  )
}