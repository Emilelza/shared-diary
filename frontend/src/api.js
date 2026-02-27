const BASE = import.meta.env.VITE_API_URL

export async function createRoom(authorName) {
  const res = await fetch('http://192.168.20.148:8000/api/rooms/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ author_name: authorName })
  })
  return res.json()
}

export async function joinRoom(roomCode, authorName) {
  const res = await fetch(`${BASE}/api/rooms/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ room_code: roomCode, author_name: authorName })
  })
  return res.json()
}

export async function getEntries(pairId) {
  const res = await fetch(`${BASE}/api/entries/${pairId}/`)
  return res.json()
}

export async function postEntry(pairId, authorName, content, moodEmoji) {
  const res = await fetch(`${BASE}/api/entries/${pairId}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      author_name: authorName,
      content: content,
      mood_emoji: moodEmoji,
      pair: pairId
    })
  })
  return res.json()
}

export async function getMemories(pairId) {
  const res = await fetch(`${BASE}/api/memories/${pairId}/`)
  return res.json()
}

export async function addReaction(entryId, reactorName) {
  const res = await fetch(`${BASE}/api/reactions/${entryId}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      reactor_name: reactorName,
      emoji: '❤️'
    })
  })
  return res.json()
}