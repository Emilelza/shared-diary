import { useState } from 'react'
import { addReaction } from '../api'

export default function EntryCard({ entry }) {
  const userName = localStorage.getItem('userName') || 'You'
  const [hearts, setHearts] = useState(entry.reactions ? entry.reactions.length : 0)
  const [reacted, setReacted] = useState(false)

  const date = new Date(entry.created_at).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  const handleReact = async () => {
    if (reacted) return
    try {
      await addReaction(entry.id, userName)
      setHearts(prev => prev + 1)
      setReacted(true)
    } catch (err) {
      console.error('Reaction failed', err)
    }
  }

  return (
    <div className="bg-white rounded-xl p-5 mb-3 shadow-sm border border-amber-100">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-amber-900 text-sm">
          {entry.author_name || entry.author}
        </span>
        <span className="text-xs text-amber-400">{date}</span>
      </div>
      <div className="flex gap-3 items-start">
        <span className="text-2xl">{entry.mood_emoji || entry.mood}</span>
        <p className="text-gray-700 leading-relaxed text-sm flex-1">
          {entry.content || entry.text}
        </p>
      </div>
      <div className="mt-3 text-right">
        <button
          onClick={handleReact}
          className={`text-sm transition-colors ${reacted ? 'text-rose-500' : 'text-rose-300 hover:text-rose-500'}`}
        >
          ❤️ {hearts}
        </button>
      </div>
    </div>
  )
}