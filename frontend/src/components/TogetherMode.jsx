import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const VIBES = ['☕ Having chai', '🎵 Listening to music', '📚 Studying', '🌙 Cant sleep', '🍜 Eating', '🚶 Taking a walk', '💻 Working', '🥱 Just woke up']

export default function TogetherMode({ userName, roomCode }) {
  const [onlineUsers, setOnlineUsers] = useState([])
  const [myVibe, setMyVibe] = useState('')
  const [showVibes, setShowVibes] = useState(false)
  const [channel, setChannel] = useState(null)

  useEffect(() => {
    const ch = supabase.channel(`room:${roomCode}`, {
      config: { presence: { key: userName } }
    })

    ch.on('presence', { event: 'sync' }, () => {
      const state = ch.presenceState()
      const users = Object.values(state).map(u => u[0])
      setOnlineUsers(users)
    })

    ch.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await ch.track({
          name: userName,
          vibe: myVibe,
          online_at: new Date().toISOString()
        })
      }
    })

    setChannel(ch)

    return () => {
      supabase.removeChannel(ch)
    }
  }, [roomCode, userName])

  const updateVibe = async (vibe) => {
    setMyVibe(vibe)
    setShowVibes(false)
    if (channel) {
      await channel.track({
        name: userName,
        vibe: vibe,
        online_at: new Date().toISOString()
      })
    }
  }

  return (
    <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-amber-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-amber-900">🌿 Together Mode</h3>
        <button
          onClick={() => setShowVibes(!showVibes)}
          className="text-xs text-amber-600 hover:text-amber-800 border border-amber-200 rounded-lg px-2 py-1"
        >
          {myVibe || 'Set your vibe ✨'}
        </button>
      </div>

      {showVibes && (
        <div className="flex flex-wrap gap-2 mb-3">
          {VIBES.map(v => (
            <button
              key={v}
              onClick={() => updateVibe(v)}
              className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-full px-3 py-1 border border-amber-200"
            >
              {v}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-2">
        {onlineUsers.length === 0 ? (
          <p className="text-xs text-amber-400 italic">No one is here yet...</p>
        ) : (
          onlineUsers.map((user, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span className="text-sm text-amber-900 font-medium">{user.name}</span>
              {user.vibe && (
                <span className="text-xs text-amber-500">{user.vibe}</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
