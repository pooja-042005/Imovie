# 🎬 IMovies - Full-Stack MERN Cinema Booking Platform

<div align="center">

  <img src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1200" alt="IMovies Banner" width="100%" style="border-radius: 8px;" />

  <p><b>An immersive, Netflix-inspired full-stack cinema booking application built with the MERN stack.</b></p>

  <p>
    <img src="https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge" />
    <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" />
    <img src="https://img.shields.io/badge/Tech-MERN-orange?style=for-the-badge" />
  </p>
</div>

---

## 🚀 About The Project

**IMovies** replicates a high-end cinematic streaming and ticketing experience. It bridges the gap between sleek frontend design (Netflix UI/UX) and robust backend architecture (REST APIs, JWT Authentication, Role-Based Access Control, and MongoDB). 

Users can seamlessly browse trending blockbusters, search via an expandable search bar, choose theatres & show timings, pick interactive seats, and track their booking history. Admins get a secure, protected dashboard to manage movies dynamically.

---

## ✨ Key Features

* **🎨 Netflix-Inspired UI/UX**: Dark cinematic theme (`#141414`), smooth card hover scaling, expandable search bar, and glassmorphic animated auth screens.
* **🔐 Role-Based Authentication (RBAC)**: Secure registration and sign-in workflows distinguishing between standard **Customers** and privileged **Admins** using `JWT` and `bcrypt.js`.
* **🛠️ Admin Management Panel**: Protected dashboard allowing authorized admins to perform full CRUD operations (add new blockbusters or remove existing movies).
* **🎟️ Interactive Show & Seat Selection**: Users can choose from multiple multi-plexes (PVR, Cinepolis, IMAX), pick specific timings, select custom seats (`A1`, `A2`, etc.), and view live pricing breakdowns in ₹ (INR).
* **📜 Booking History Dashboard**: Dedicated portal for users to review all past and active ticket reservations complete with timestamps and payment summaries.
* **⚡ Optimized Backend**: Modular MVC architecture with automated database force-seeding and secure Express middleware.

---

## 🛠️ Tech Stack

* **Frontend**: React.js, React Router, Axios, CSS3 (Flexbox & Grid)
* **Backend**: Node.js, Express.js, JSON Web Tokens (JWT), bcrypt.js
* **Database**: MongoDB Atlas, Mongoose ODM

---

## 📂 Folder Structure

```text
IMovies/
├── backend/
│   ├── models/        # Mongoose Schemas (Movie, User, Booking)
│   ├── routes/        # Express REST API Endpoints (auth, movies, bookings)
│   ├── server.js      # Main Express server & database auto-seeder
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.jsx    # Complete SPA router, views, and components
    │   └── main.jsx
    └── package.json
