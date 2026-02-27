export default function MemoryModal({ memory, onClose }) {
  const date = new Date(memory.created_at).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-amber-50 rounded-2xl p-6 max-w-sm w-full shadow-2xl border-2 border-amber-200">
        <div className="text-center mb-4">
          <div className="text-3xl mb-2">🕰️</div>
          <h2 className="text-lg font-bold text-amber-900">Remember This?</h2>
          <p className="text-xs text-amber-500 mt-1">On this day, one year ago...</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-amber-100">
          <div className="flex justify-between text-xs text-amber-400 mb-2">
            <span className="font-medium text-amber-700">
              {memory.author_name || memory.author}
            </span>
            <span>{date}</span>
          </div>
          <div className="flex gap-2 items-start">
            <span className="text-xl">{memory.mood_emoji || memory.mood}</span>
            <p className="text-gray-700 text-sm leading-relaxed italic">
              "{memory.content || memory.text}"
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full text-amber-600 hover:text-amber-800 text-sm font-medium transition-colors"
        >
          Close ✕
        </button>
      </div>
    </div>
  )
}