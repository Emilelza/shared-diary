export default function AnniversaryPopup({ moment, onClose }) {
  const originalDate = new Date(moment.date).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-amber-50 rounded-2xl p-6 max-w-sm w-full shadow-2xl border-2 border-amber-200">
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">🎊</div>
          <h2 className="text-lg font-bold text-amber-900">On This Day!</h2>
          <p className="text-xs text-amber-500 mt-1">A special moment from {originalDate}</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-amber-100">
          <p className="font-semibold text-amber-900 text-center mb-2">{moment.title}</p>
          {moment.image && (
            <img
              src={moment.image}
              alt="moment"
              className="w-full rounded-lg max-h-48 object-cover mb-3"
            />
          )}
          {moment.note && (
            <p className="text-gray-600 text-sm italic text-center">"{moment.note}"</p>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-amber-500 hover:bg-amber-600 text-white rounded-xl p-3 text-sm font-semibold transition-colors"
        >
          Cherish this memory 💛
        </button>
      </div>
    </div>
  )
}