import { useNavigate, useParams, useLocation } from 'react-router-dom'

export default function BottomNav() {
  const { roomCode } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname

  const tabs = [
    { label: 'Diary', emoji: '📔', route: `/diary/${roomCode}` },
    { label: 'Moments', emoji: '⭐', route: `/diary/${roomCode}/moments` },
    { label: 'Date Ideas', emoji: '🎲', route: `/diary/${roomCode}/ideas` },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-amber-100 flex z-40">
      {tabs.map(tab => {
        const active = path === tab.route
        return (
          <button
            key={tab.route}
            onClick={() => navigate(tab.route)}
            className={`flex-1 py-3 flex flex-col items-center gap-1 text-xs font-medium transition-colors
              ${active ? 'text-amber-700 bg-amber-50' : 'text-gray-400 hover:text-amber-500'}`}
          >
            <span className="text-xl">{tab.emoji}</span>
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}