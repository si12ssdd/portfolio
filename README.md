# Siddharth Yadav — Portfolio

Premium MERN stack developer portfolio with admin dashboard.

## Stack

| Layer    | Tech                                            |
|----------|-------------------------------------------------|
| Frontend | React 18 + Vite, Framer Motion, GSAP, Tailwind  |
| Backend  | Node.js + Express.js                            |
| Database | MongoDB + Mongoose                              |
| Auth     | JWT (admin dashboard)                           |
| Email    | Nodemailer                                      |

---

## Quick Start

### 1. Backend

```bash
cd backend
cp .env.example .env          # fill in your values
npm install
npm run dev                   # starts on http://localhost:5000
```

**Seed the database** (creates admin + 3 sample projects):

```bash
node data/seed.js
```

Default admin credentials:
- Email: `hydrasiddhu213@gmail.com`
- Password: `admin123`

---

### 2. Frontend

```bash
cd frontend
npm install
npm run dev                   # starts on http://localhost:5173
```

The Vite dev server proxies `/api/*` to `http://localhost:5000`.

---

## Project Structure

```
portfolio/
├── backend/
│   ├── config/db.js            MongoDB connection
│   ├── controllers/            Business logic
│   ├── data/seed.js            Database seeder
│   ├── middleware/auth.js      JWT middleware
│   ├── models/                 Mongoose schemas
│   ├── routes/                 Express routes
│   └── server.js               Entry point
│
└── frontend/
    ├── public/
    └── src/
        ├── components/
        │   ├── Cursor.jsx        Custom animated cursor
        │   ├── Loader.jsx        Premium loading screen
        │   ├── Navbar.jsx        Glassmorphism navbar
        │   ├── Hero.jsx          MERN stack visualization
        │   ├── About.jsx         Stats + cards
        │   ├── Skills.jsx        Infinite marquee + chips
        │   ├── Projects.jsx      3D tilt project cards
        │   ├── Experience.jsx    Timeline
        │   ├── Certifications.jsx
        │   ├── Contact.jsx       Contact form → API
        │   ├── Footer.jsx
        │   └── ScrollProgress.jsx
        ├── hooks/
        │   ├── useScrollAnimation.js
        │   └── useCounter.js
        ├── pages/
        │   ├── Home.jsx
        │   └── Admin.jsx         Protected dashboard
        └── utils/api.js          Axios instance
```

---

## API Endpoints

| Method | Endpoint                   | Auth   | Description               |
|--------|----------------------------|--------|---------------------------|
| POST   | /api/contact               | Public | Submit contact form        |
| GET    | /api/contact               | Admin  | Get all messages           |
| PATCH  | /api/contact/:id/read      | Admin  | Mark message as read       |
| DELETE | /api/contact/:id           | Admin  | Delete message             |
| GET    | /api/projects              | Public | Get all projects           |
| GET    | /api/projects/:id          | Public | Get single project         |
| POST   | /api/projects              | Admin  | Create project             |
| PUT    | /api/projects/:id          | Admin  | Update project             |
| DELETE | /api/projects/:id          | Admin  | Delete project             |
| POST   | /api/admin/login           | Public | Admin login → JWT          |
| GET    | /api/admin/me              | Admin  | Get admin profile          |
| GET    | /api/portfolio             | Public | Get static portfolio data  |
| GET    | /api/health                | Public | Health check               |

---

## Admin Dashboard

Visit `/admin` → login → manage projects & view messages.

---

## Deployment

**Frontend (Vercel):**
```bash
vercel --cwd frontend
```

**Backend (Render):**
- Set environment variables from `.env.example`
- Build command: `npm install`
- Start command: `node server.js`

Update `CORS` origins in `server.js` with your Vercel URL.

---

## Design System

| Token         | Value         |
|---------------|---------------|
| `--bg-primary`| `#0a0a0a`     |
| `--accent`    | `#f97316`     |
| Font Heading  | Space Grotesk |
| Font Body     | Inter         |
