  JobTrack — Job & Internship Application Tracker

A full-stack MERN application to manage and track job/internship applications — including company details, application status, notes, and follow-up reminders — all in one clean dashboard.

Live Demo:** [job-track-1-ruj0.onrender.com](https://job-track-1-ruj0.onrender.com)
 GitHub Repo:** [github.com/YashwantChauhan977/JOB-TRACK](https://github.com/YashwantChauhan977/JOB-TRACK)

---

  Features

- Secure Authentication** — JWT-based signup/login to protect user-specific data
- Add & Manage Applications** — Store company name, role, status, notes, and application date
- Full CRUD Functionality** — Create, view, update, and delete application records
- Follow-Up Reminders** — Keep track of when to follow up on pending applications
- Status Tracking** — Organize applications by stage (Applied, Interview, Offer, Rejected, etc.)
- Responsive UI** — Built with React + Vite for a fast, smooth experience across devices
- Live Deployment** — Frontend and backend independently deployed on Render

---

 Tech Stack

Frontend:
- React
- Vite
- Axios
- React Router

Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT) for authentication
- bcrypt for password hashing

**Deployment:**
- Render (Frontend & Backend)

---

Project Structure

```
JOB-TRACK/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.jsx
│   ├── index.html
│   └── vite.config.js
└── README.md
```

---

 Installation & Setup

 1. Clone the repository
```bash
git clone https://github.com/YashwantChauhan977/JOB-TRACK.git
cd JOB-TRACK
```

 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Run the backend server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Run the frontend:
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

---


 Future Improvements

-  Email/SMS notifications for follow-up reminders
-  Analytics dashboard (application success rate, response time, etc.)
-  Search and filter applications by company, status, or date
-  Dark mode support

---

This project is licensed under the [MIT License](LICENSE).

---

 Author

**Yashwant Chauhan**
🔗 [GitHub](https://github.com/YashwantChauhan977)

---

⭐️ If you found this project helpful, consider giving it a star on GitHub!
