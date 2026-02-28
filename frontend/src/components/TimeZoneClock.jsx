import { useState, useEffect } from 'react'

const TIMEZONES = [
  { city: 'Mumbai', zone: 'Asia/Kolkata', flag: '🇮🇳' },
  { city: 'London', zone: 'Europe/London', flag: '🇬🇧' },
  { city: 'New York', zone: 'America/New_York', flag: '🇺🇸' },
  { city: 'Dubai', zone: 'Asia/Dubai', flag: '🇦🇪' },
  { city: 'Singapore', zone: 'Asia/Singapore', flag: '🇸🇬' },
  { city: 'Sydney', zone: 'Australia/Sydney', flag: '🇦🇺' },
  { city: 'Toronto', zone: 'America/Toronto', flag: '🇨🇦' },
  { city: 'Berlin', zone: 'Europe/Berlin', flag: '🇩🇪' },
]

export default function TimeZoneClock() {
  const [time, setTime] = useState(new Date())
  const [zone1, setZone1] = useState(TIMEZONES[0])
  const [zone2, setZone2] = useState(TIMEZONES[1])
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getTime = (zone) => {
    return time.toLocaleTimeString('en-US', {
      timeZone: zone.zone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const getDate = (zone) => {
    return time.toLocaleDateString('en-IN', {
      timeZone: zone.zone,
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    })
  }

  return (
    <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-amber-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-amber-900">🕐 Our Time</h3>
        <button
          onClick={() => setEditing(!editing)}
          className="text-xs text-amber-500 hover:text-amber-700 border border-amber-200 rounded-lg px-2 py-1"
        >
          {editing ? 'Done' : 'Change cities'}
        </button>
      </div>

      {editing && (
        <div className="mb-3 grid grid-cols-2 gap-2">
          <div>
            <p className="text-xs text-amber-500 mb-1">Your city</p>
            <select
              value={zone1.city}
              onChange={e => setZone1(TIMEZONES.find(z => z.city === e.target.value))}
              className="w-full text-xs border border-amber-200 rounded-lg p-2 focus:outline-none"
            >
              {TIMEZONES.map(z => (
                <option key={z.city} value={z.city}>{z.flag} {z.city}</option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-xs text-amber-500 mb-1">Their city</p>
            <select
              value={zone2.city}
              onChange={e => setZone2(TIMEZONES.find(z => z.city === e.target.value))}
              className="w-full text-xs border border-amber-200 rounded-lg p-2 focus:outline-none"
            >
              {TIMEZONES.map(z => (
                <option key={z.city} value={z.city}>{z.flag} {z.city}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-amber-50 rounded-xl p-3 text-center">
          <p className="text-lg">{zone1.flag}</p>
          <p className="text-xs text-amber-500 mt-1">{zone1.city}</p>
          <p className="text-xl font-bold text-amber-900 mt-1">{getTime(zone1)}</p>
          <p className="text-xs text-amber-400 mt-1">{getDate(zone1)}</p>
        </div>
        <div className="bg-rose-50 rounded-xl p-3 text-center">
          <p className="text-lg">{zone2.flag}</p>
          <p className="text-xs text-rose-400 mt-1">{zone2.city}</p>
          <p className="text-xl font-bold text-rose-700 mt-1">{getTime(zone2)}</p>
          <p className="text-xs text-rose-300 mt-1">{getDate(zone2)}</p>
        </div>
      </div>
    </div>
  )
}