# 🌸 Reverie — Shared Diary for Long Distance

**Feel close, even when miles apart.**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)]()
[![React](https://img.shields.io/badge/React-18-blue)]()
[![Django](https://img.shields.io/badge/Django-6.0-green)]()
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-darkgreen)]()

Reverie is a private shared diary built for two people separated by distance — couples, best friends, siblings, or parents and children.

Unlike fast messaging apps, Reverie preserves emotions and resurfaces shared memories over time.

---

# 🚩 Problem Statement

Maintaining emotional connection and shared experiences over long distances is difficult.

### Key Insights

- “Feeling forgotten” is the #1 fear in long-distance relationships  
- 35M+ students migrate annually within India for education  
- Millions of families are separated due to work and migration  
- Messaging apps are transactional — they do not preserve memories  
- No tool resurfaces shared diary entries on anniversaries  

---

# 💡 Solution

Reverie provides:

- A **shared private diary space**
- Emotional memory resurfacing on anniversaries
- Real-time presence (“Together Mode”)
- Time zone awareness
- Memory bookmarking
- Virtual date suggestions

It is designed to be slow, intentional, and emotionally meaningful.

---

# ✨ Core Features

## 📝 Shared Diary
Write daily entries with mood emojis. Both users see updates instantly.

## ⏳ Remember This?
On the anniversary of past entries, both users receive a memory reminder.

## 🟢 Together Mode
See when your partner is online and set a vibe status.

## 🌍 Time Zone Clock
Displays both users' local time.

## ⭐ Favourite Moments
Save special entries with photos and receive anniversary reminders.

## 🎲 Date Ideas
Random ideas for virtual dates or future meetups.

## ❤️ Reactions
React to entries using emoji responses.

---

# 🧱 Tech Stack

## Frontend
- React 18 (Vite)
- Tailwind CSS
- Supabase Realtime Presence

## Backend
- Python 3.x
- Django 6.0
- Django REST Framework

## Database
- Supabase PostgreSQL

## Deployment
- Frontend → Vercel
- Backend → Render

## Version Control
- Git + GitHub

---

# 🏗️ System Architecture

## Client Layer
React components:
- JoinRoom
- DiaryFeed
- EntryCard
- EntryForm
- MemoryModal
- TogetherMode
- TimeZoneClock
- AnniversaryPopup

Communicates with backend via REST API.

---

## Backend Layer (Django REST)

| Endpoint | Purpose |
|----------|----------|
| `/api/rooms/` | Create or join diary |
| `/api/entries/:pairId/` | Create / fetch entries |
| `/api/memories/:pairId/` | Anniversary entries |
| `/api/reactions/:entryId/` | Add reactions |

---

## Database Schema

### Pair
| Field | Type |
|-------|------|
| id | Integer |
| room_code | 6-digit string |
| created_at | Timestamp |

### DiaryEntry
| Field | Type |
|-------|------|
| id | UUID |
| pair | ForeignKey |
| author_name | String |
| content | Text |
| mood_emoji | String |
| created_at | Timestamp |

### Reaction
| Field | Type |
|-------|------|
| id | Integer |
| entry | ForeignKey |
| reactor_name | String |
| emoji | String |
| created_at | Timestamp |

---

# ⚙️ Installation Guide

## Prerequisites
- Python 3.10+
- Node.js 18+
- Supabase account
- Git

---

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Emilelza/shared-diary.git
cd shared-diary
