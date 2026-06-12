# Nova Studio — Creative Digital Agency Platform

A fullstack web application for **Nova Studio**, a fictional creative digital agency. Built with Next.js (App Router), PostgreSQL (Neon), and MongoDB Atlas.

---

## Features

- **Landing Page** — Hero section with page-load animation, heading, subheading, and CTA button
- **Services Section** — Three services fetched from PostgreSQL, displayed in a responsive grid with hover effects
- **Portfolio Section** — Projects fetched from PostgreSQL, displayed as cards with category badges
- **Statistics Section** — Key metrics with count-up animation, fetched from the database
- **Contact Form** — Validated on both frontend and backend, submissions stored in PostgreSQL
- **Admin Panel** — Protected by JWT (httpOnly cookie). View inquiries, add/delete projects, view analytics
- **Analytics (Bonus)** — Tracks page visits and CTA clicks, stored in MongoDB Atlas

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router) |
| Styling | Vanilla CSS (globals.css) |
| ORM | Prisma v5 |
| Primary Database | PostgreSQL (Neon) |
| Secondary Database | MongoDB Atlas |
| Auth | JWT (jsonwebtoken) + bcryptjs |

---

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/neondb?sslmode=require"
MONGODB_URI="mongodb+srv://USER:PASSWORD@HOST/nova-studio?retryWrites=true&w=majority"
JWT_SECRET="your-secret-key-here"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="YourPassword@2024"
```

### 3. Push schema and seed data

```bash
npx prisma db push
npx prisma db seed
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API Reference

### Public Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/services` | Fetch all services |
| GET | `/api/projects` | Fetch all portfolio projects |
| GET | `/api/stats` | Fetch statistics |
| POST | `/api/contact` | Submit a contact inquiry |
| POST | `/api/analytics` | Track a user event |
| POST | `/api/auth/login` | Admin login |
| POST | `/api/auth/logout` | Admin logout |

### Protected Endpoints (Admin Only)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/contacts` | View all contact submissions |
| POST | `/api/projects` | Add a new project |
| DELETE | `/api/projects/[id]` | Delete a project by ID |
| GET | `/api/analytics` | View analytics event log |

All protected endpoints require an active admin session (httpOnly JWT cookie). Returns `401 Unauthorized` if not authenticated.

---

## Database Design

**PostgreSQL (via Prisma)**

- `Project` — id, title, category, imageUrl, description, createdAt
- `Contact` — id, name, email, message, createdAt
- `Service` — id, title, description, icon
- `Stat` — id, label, value, suffix
- `Admin` — id, username, password (bcrypt hashed)

**MongoDB Atlas**

- `Analytics` — eventType, page, metadata, userAgent, timestamp

---

## Design Decisions

1. **SSR for landing page** — `page.js` is an async server component that fetches services, projects, and stats directly from the database before sending HTML to the client. No loading states needed.
2. **Dual database** — PostgreSQL handles structured relational data (projects, contacts, services). MongoDB handles append-only analytics logs where schema flexibility is useful.
3. **JWT in httpOnly cookies** — Auth token is never accessible to JavaScript. Prevents XSS token theft.
4. **Frontend + backend validation** — Contact and project forms validate on the client for fast feedback, and re-validate on the server to prevent direct API abuse.
5. **Count-up animation** — Stats section uses a `setInterval` counter triggered on mount, giving a live feel without any animation library dependency.
