# shared-diary
Reverie
Feel close, from far away 🌸

[License](https://img.shields.io/badge/license-MIT-blue.svg)
[React](https://img.shields.io/badge/React-18-blue)
[Django](https://img.shields.io/badge/Django-6.0-green)
[Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-darkgreen)

A shared diary app for two people who miss each other — couples, best friends, siblings, parents and children separated by distance. Not just a messaging app — a living memory book that reminds you of shared moments across time.

---

## 📌 Table of Contents
- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Run Commands](#-run-commands)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Demo Video](#-demo-video)
- [Team](#-team)
- [License](#-license)

---

Problem Statement:

Maintaining emotional connection and shared experiences over long distances is difficult.

- Long distance relationships suffer from "feeling forgotten" as the #1 fear
- 35M+ students migrate within India every year for education
- Millions of families separated by work, studies, and immigration
- Existing tools (WhatsApp, texting) are fast and transactional — they don't preserve emotion
- No existing tool resurfaces shared memories on their anniversary

Solution:

Reverie is a private, intimate shared space where two people write to each other every day — and relive their memories together on anniversaries.

Unlike WhatsApp or texting, Reverie is slow, cozy, and emotional — designed to make you feel close even from 1000 miles away.


Features:

Shared Diary - Write daily entries with mood emojis, visible to both people in real time.

Remember This? - On anniversaries of old entries, both get a warm pop-up reminder.

Together Mode - See when your person is online and set a cozy vibe status.

Time Zone Clock - See both people's local time — perfect for long distance.

Favourite Moments  Save special dates with photos, get anniversary reminders.

Date Ideas - Random ideas to do together virtually or when you next meet.

Reactions - React to memories and entries with heart emojis.   


Tech Stack:

Frontend – React 18 with Vite and Tailwind CSS

Backend – Python 3.14 with Django 6.0 and Django REST Framework

Database – Supabase (PostgreSQL)

Realtime – Supabase Realtime Presence

Fonts – Montserrat for headings and Poppins for body text

Version Control – Git and GitHub

Frontend Deployment – Vercel

Backend Deployment – RENDER

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                     │
│                                                          │
│   React + Vite + Tailwind CSS                           │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│   │ JoinRoom │ │DiaryFeed │ │ Moments  │ │DateIdeas │ │
│   └──────────┘ └──────────┘ └──────────┘ └──────────┘ │
│                                                          │
│   Components: EntryCard, EntryForm, MemoryModal,        │
│   TogetherMode, TimeZoneClock, AnniversaryPopup         │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP REST API
                         ▼
┌─────────────────────────────────────────────────────────┐
│                  BACKEND (Django)                        │
│                                                          │
│   Django REST Framework                                  │
│   ┌──────────────────────────────────────────────────┐  │
│   │  /api/rooms/     → CreateJoinPairView            │  │
│   │  /api/entries/   → DiaryEntryListCreateView      │  │
│   │  /api/memories/  → RememberThisView              │  │
│   │  /api/reactions/ → ReactionCreateView            │  │
│   └──────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────┘
                         │ PostgreSQL Connection
                         ▼
┌─────────────────────────────────────────────────────────┐
│                  DATABASE (Supabase)                     │
│                                                          │
│   ┌────────────┐  ┌───────────────┐  ┌──────────────┐  │
│   │    Pair    │  │  DiaryEntry   │  │   Reaction   │  │
│   │────────────│  │───────────────│  │──────────────│  │
│   │ id         │  │ id (UUID)     │  │ id           │  │
│   │ room_code  │  │ pair_id       │  │ entry_id     │  │
│   │ created_at │  │ author_name   │  │ reactor_name │  │
│   └────────────┘  │ content       │  │ emoji        │  │
│                   │ mood_emoji    │  │ created_at   │  │
│                   │ created_at    │  └──────────────┘  │
│                   └───────────────┘                     │
│                                                          │
│   Supabase Realtime → Together Mode presence            │
└─────────────────────────────────────────────────────────┘

App Flow:

Landing Page (JoinRoom)
        │
        ├── Create new diary ──→ Generate 6-digit room code
        │                              │
        └── Join existing diary ───────┘
                                       │
                                       ▼
                              DiaryFeed (Main Screen)
                                       │
                    ┌──────────────────┼──────────────────┐
                    │                  │                  │
                    ▼                  ▼                  ▼
            Write Entry         Remember This?      Together Mode
            (mood + text)       (anniversary        (presence +
                                 pop-up)             vibe status)
                    │
        ┌───────────┼───────────┐
        │                       │
        ▼                       ▼
  Favourite Moments        Date Ideas
  (special dates +         (random virtual
   photos + countdown)      date ideas)


 Installation

 Prerequisites:
- Python 3.10 or higher
- Node.js 18 or higher
- A free Supabase account at [supabase.com](https://supabase.com)
- Git


 1. Clone the Repository

bash
git clone https://github.com/Emilelza/shared-diary.git
cd shared-diary

2. Backend Installation

bash
cd backend

# Windows
python -m venv venv --without-pip
.\venv\Scripts\Activate.ps1
python -m ensurepip --upgrade

# Mac/Linux
python -m venv venv
source venv/bin/activate

Install all dependencies
pip install django djangorestframework psycopg2-binary django-cors-headers python-dotenv

Create a `.env` file inside `backend/`:

env
SECRET_KEY=your-django-secret-key-here
DEBUG=True
DB_HOST=your-supabase-pooler-host
DB_NAME=postgres
DB_PORT=6543
DB_USER=postgres.your-project-id
DB_PASSWORD=your-supabase-password

3. Frontend Installation

bash
cd frontend
npm install


Create a `.env` file inside `frontend/`:

env
VITE_API_URL=http://localhost:8000
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key


Run Commands:

 Run Backend

bash
cd backend

# Windows
.\venv\Scripts\Activate.ps1

# Mac/Linux
source venv/bin/activate

python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

Backend runs at: `http://localhost:8000`

Run Frontend

bash
cd frontend
npm run dev


Frontend runs at: `http://localhost:5173`



Run on Network (for two devices)

Update `VITE_API_URL` in `frontend/.env` to your backend laptop's local IP:

env
VITE_API_URL=http://192.168.x.x:8000


Then run frontend with:
```bash
npm run dev -- --host
```


 ###📡 API Documentation

Base URL: `http://localhost:8000/api`

###Create or Join Room
```
POST /rooms/
```
**Body (Create):**
```json
{ "author_name": "Priya" }
```
**Body (Join):**
```json
{ "room_code": "482940", "author_name": "Arjun" }
```
**Response:**
```json
{
![WhatsApp Image 2026-02-28 at 9 21 02 AM](https://github.com/user-attachments/assets/1d7a49a3-6d62-43e5-a039-da3f6dc6fe42)
![WhatsApp Image 2026-02-28 at 9 20 05 AM](https://github.com/user-attachments/assets/ac7e7b26-61df-48b2-abaf-62e999f08ea5)
![WhatsApp Image 2026-02-28 at 9 20 05 AM (1)](https://github.com/user-attachments/assets/71f69a95-4649-484a-acea-6c25e8def0ea)
  "pair![WhatsApp Image 2026-02-28 at 9 20 05 AM (3)](https://github.com/user-attachments/assets/155a238f-e90f-48d5-9d86-6416f276f1d2)
":![W![WhatsApp Image 2026-02-28 at 9 20 05 AM (2)](https://github.com/user-attachments/assets/40f8d62a-f5e6-4588-abd4-6d46c5b267a6)
hatsApp Image 2026-02-28 at 9 20 05 AM (4)](https://github.com/user-attachments/assets/ee2bb81d-cc87-4025-a70e-ec6e8248d111)
 { "id": 1, "room_code": "482940", "created_at": "..." },
  "author_n![WhatsApp Image 2026-02-28 at 9 20 07 AM](https://github.com/user-attachments/assets/17780aee-0079-4718-840e-68ebbd505131)
ame": "Priya"![WhatsApp Image 2026-02-28 at 9 21 02 AM](https://github.com/user-attachments/assets/b42fe346-2638-4d1a-83b0-0f2e783a8119)

}
```

---

### Get All Diary Entries
```
GET /entries/:pairId/
```
**Response:**
```json
[
  {
    "id": "uuid",
    "pair": 1,
    "author_name": "Priya",
    "content": "Made chai without burning it ✨",
    "mood_emoji": "😊",
    "created_at": "2026-02-27T10:00:00Z",
    "reactions": []
  }
]
```

---

### Create Diary Entry
```
POST /entries/:pairId/
```
**Body:**
```json
{
  "author_name": "Priya",
  "content": "Reached hostel today 🌧️",
  "mood_emoji": "😢",
  "pair": 1
}
```

---

### Get Remember This Memories
```
GET /memories/:pairId/
```
Returns entries from the same month/day in previous years.

**Response:**
json
[
  {
    "id": "uuid",
    "author_name": "Priya",
    "content": "This time last year we watched the sunset together",
    "mood_emoji": "🥰",
    "created_at": "2025-02-28T18:00:00Z"
  }
]

### Add Reaction

POST /reactions/:entryId/

**Body:**
json
{
  "reactor_name": "Arjun",
  "emoji": "❤️"
}


## 👥 Team AlphaBeta

Emil Elsa Biji – Backend Developer responsible for Django, Supabase integration, REST API development, and database design.

Anna Rose Dolphy – Frontend Developer responsible for React, Tailwind CSS, UI/UX design, and Supabase Realtime integration.

Built at TinkerHub Hackathon 2026.
Problem Statement – Maintaining emotional connection and shared experiences over long distances is difficult.


## 🔮 Future Roadmap

- **Phase 2** — Google/phone number login for persistent accounts and push notifications
- **Phase 3** — AI diary prompts using OpenAI API
- **Phase 4** — Voice diary entries
- **Phase 5** — Monthly auto-generated memory letters
- **Phase 6** — Group diaries for friend groups (3+ people)
- **Monetization** — Freemium model with premium themes and AI features



## 🤖 AI Tools Used

* Claude (Anthropic) – Used for project planning, code generation, debugging, and architecture decisions.

##Demo Video Link
youtube link:https://youtu.be/08131iT6aGA?si=XqTsxWJYCoG84kkN


## 📄 License

MIT License

Copyright (c) 2026 Emil Elsa Biji & Anna Rose Dolphy


