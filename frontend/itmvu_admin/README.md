🎓 Alumni Association Portal

A full-stack MERN (MongoDB, Express, React, Node.js) based web application that connects alumni, students, and college administration on a single platform.

✅ Features Implemented So Far

🔐 Authentication (Backend)
- User Registration (Signup) with hashed passwords using `bcrypt`
- User Login with secure `JWT`-based token stored in `httpOnly` cookies
- Role-based structure: `alumni`, `student`, and `admin`

🧠 System Overview

👨‍🎓 Alumni & Student UI (Frontend)
- Both have **separate dashboards**
- Alumni Features:
  - Create posts
  - Donate to the college
  - Post jobs and internships
  - Chat with students and other alumni
  - View events, hackathons, and meetups

- Student Features:
  - Create posts
  - Chat with alumni
  - Apply to jobs and internships
  - View college events and hackathons

🛡️ Admin UI (Frontend)
- Separate dashboard with admin-only access
- Admin can:
  - Verify alumni and student registrations
  - Post announcements & events
  - Manage job postings
  - View and manage donations

🧰 Tech Stack

| Layer        | Technology             |
|--------------|------------------------|
| Frontend     | React.js + Tailwind CSS |
| Backend      | Node.js + Express.js    |
| Database     | MongoDB + Mongoose      |
| Auth         | JWT, bcrypt             |
| Deployment   | (To be added)           |

