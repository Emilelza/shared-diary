import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

export default function MomentsPage() {
  const { roomCode } = useParams()
  const navigate = useNavigate()
  const [moments, setMoments] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [note, setNote] = useState('')
  const [imagePreview, setImagePreview] = useState(null)

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`favMoments_${roomCode}`) || '[]')
setMoments(saved)
  }, [])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setImagePreview(reader.result)
    reader.readAsDataURL(file)
  }
const handleSave = () => {
    if (!title.trim() || !date) return alert('Please add a title and date')
    const newMoment = {
      id: Date.now(),
      title,
      date,
      note,
      image: imagePreview,
    }
    const updated = [newMoment, ...moments]
    setMoments(updated)
    localStorage.setItem(`favMoments_${roomCode}`, JSON.stringify(updated))
    setTitle('')
    setDate('')
    setNote('')
    setImagePreview(null)
    setShowForm(false)
  }

  const handleDeleteMoment = (id) => {
    const updated = moments.filter(m => m.id !== id)
    setMoments(updated)
    localStorage.setItem(`favMoments_${roomCode}`, JSON.stringify(updated))
  }
  

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  const getDaysUntil = (dateStr) => {
    const today = new Date()
    const target = new Date(dateStr)
    target.setFullYear(today.getFullYear())
    if (target < today) target.setFullYear(today.getFullYear() + 1)
    const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24))
    if (diff === 0) return '🎉 Today!'
    if (diff === 1) return '🌸 Tomorrow!'
    return `${diff} days away`
  }

  return (
    <div className="min-h-screen bg-amber-50 pb-24">

      {/* Header */}
      <div className="bg-amber-800 text-white p-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button onClick={() => navigate(`/diary/${roomCode}`)} className="text-amber-200 hover:text-white text-sm">
            ← Back
          </button>
          <h1 className="text-lg font-bold">⭐ Favourite Moments</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="text-amber-200 hover:text-white text-sm"
          >
            + Add
          </button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-4">

        {/* Add Form */}
        {showForm && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100 mb-4">
            <p className="text-sm font-bold text-amber-900 mb-3">✨ Add a Favourite Moment</p>

            <label className="text-xs text-amber-700 font-medium">Title *</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Our first video call"
              className="w-full border border-amber-200 rounded-lg p-2 text-sm mt-1 mb-3 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />

            <label className="text-xs text-amber-700 font-medium">Date *</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full border border-amber-200 rounded-lg p-2 text-sm mt-1 mb-3 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />

            <label className="text-xs text-amber-700 font-medium">Note (optional)</label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="What made this moment special?"
              rows={2}
              className="w-full border border-amber-200 rounded-lg p-2 text-sm mt-1 mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-amber-300"
            />

            <label className="text-xs text-amber-700 font-medium block mb-1">Photo (optional)</label>
            <label className="flex items-center gap-2 text-amber-500 hover:text-amber-700 text-sm cursor-pointer w-fit mb-2">
              📸 Choose a photo
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            {imagePreview && (
              <div className="relative w-fit mb-3">
                <img src={imagePreview} alt="preview" className="rounded-lg max-h-40 object-cover border border-amber-100" />
                <button
                  onClick={() => setImagePreview(null)}
                  className="absolute top-1 right-1 bg-white rounded-full text-xs px-1 shadow text-gray-400 hover:text-red-400"
                >✕</button>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white rounded-xl p-2 text-sm font-semibold"
              >
                Save Moment 💛
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 border border-amber-200 text-amber-500 rounded-xl p-2 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Moments List */}
        {moments.length === 0 && !showForm ? (
          <div className="text-center mt-20">
            <div className="text-5xl mb-4">⭐</div>
            <p className="text-amber-400 italic text-sm">No favourite moments yet</p>
            <p className="text-amber-300 text-xs mt-1">Tap + Add to save your first one</p>
          </div>
        ) : (
          moments.map(m => (
            <div key={m.id} className="bg-white rounded-2xl shadow-sm border border-amber-100 mb-4 overflow-hidden">
              {m.image && (
                <img src={m.image} alt="moment" className="w-full max-h-52 object-cover" />
              )}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-amber-900">{m.title}</h3>
                  <span className="text-xs bg-rose-50 text-rose-400 px-2 py-1 rounded-full ml-2 whitespace-nowrap">
                    {getDaysUntil(m.date)}
                  </span>
                </div>
                <p className="text-xs text-amber-400 mt-1">{formatDate(m.date)}</p>
                {m.note && (
                  <p className="text-sm text-gray-600 italic mt-2">"{m.note}"</p>
                )}
                <button
                  onClick={() => {
                    if (window.confirm('Delete this moment?')) handleDeleteMoment(m.id)
                  }}
                  className="mt-3 text-xs text-red-300 hover:text-red-500 transition-colors"
                >
                  🗑️ Delete moment
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <BottomNav />
    </div>
  )
}