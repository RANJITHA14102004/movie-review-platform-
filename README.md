# movie-review-platform

Sure! Here's a **comprehensive README** for your **Movie Review Platform** project, ready for GitHub submission. You can copy this into a `README.md` file in your project root.

---

# 🎬 Movie Review Platform

## **Project Overview**

The **Movie Review Platform** is a full-stack web application that allows users to browse movies, read and write reviews, rate films, and manage a personal watchlist. It supports both casual users and admin users. Admins can manage movies and user accounts through a dedicated dashboard.

The application uses **React** for the frontend and **Node.js + Express** for the backend, with **MongoDB** as the database. The system supports user authentication, CRUD operations on movies and reviews, and real-time notifications.

---

## **Features**

### **Frontend (React)**

* Home page with **featured and trending movies**.
* Movie listing page with **search and filter** by genre, rating, or release year.
* Individual movie pages with **details, trailers, cast, and reviews**.
* **User profile page** with review history and watchlist.
* **Review submission form** with star ratings and text input.
* **Movie watchlist management**.
* **Responsive design** for desktop and mobile.
* State management using **React Context**.
* Navigation with **React Router**.
* Error handling and loading states for better UX.

### **Backend (Node.js + Express)**

* **RESTful API** for movies, users, reviews, and recommendations.
* **Admin dashboard** to manage movies and users.
* **User authentication** (register/login) with JWT.
* **Average rating calculation** for each movie.
* **MongoDB** for data storage.
* **Data validation** using `express-validator`.
* Optional integration with **external movie API** (TMDB) for posters and details.
* **Socket.io** for real-time notifications.

### **API Endpoints**

**Auth**

* `POST /api/auth/register` – Register new user (admin or casual).
* `POST /api/auth/login` – Login and get JWT token.

**Movies**

* `GET /api/movies` – List all movies (pagination + filtering).
* `GET /api/movies/:id` – Get movie details with reviews.
* `POST /api/movies` – Add new movie (admin only).
* `GET /api/movies/:id/reviews` – Get movie reviews.
* `POST /api/movies/:id/reviews` – Add review for a movie.

**Users**

* `GET /api/users/:id` – Get user profile + reviews.
* `PUT /api/users/:id` – Update user profile.
* `GET /api/users/:id/watchlist` – Get watchlist.
* `POST /api/users/:id/watchlist` – Add movie to watchlist.
* `DELETE /api/users/:id/watchlist/:movieId` – Remove movie from watchlist.

**Admin**

* `GET /api/admin/users` – List all users.
* `DELETE /api/admin/users/:id` – Delete a user.
* `GET /api/admin/movies` – List all movies.
* `DELETE /api/admin/movies/:id` – Delete a movie.

---

## **Database Schema**

### **Users**

| Field      | Type    | Description           |
| ---------- | ------- | --------------------- |
| username   | String  | User's name           |
| email      | String  | User email            |
| password   | String  | Hashed password       |
| profilePic | String  | Profile picture URL   |
| isAdmin    | Boolean | Admin flag            |
| createdAt  | Date    | Account creation date |

### **Movies**

| Field       | Type      | Description      |
| ----------- | --------- | ---------------- |
| title       | String    | Movie title      |
| genre       | String    | Movie genre      |
| releaseYear | Number    | Year of release  |
| director    | String    | Director         |
| cast        | \[String] | Cast list        |
| synopsis    | String    | Movie synopsis   |
| posterURL   | String    | Poster image URL |
| avgRating   | Number    | Average rating   |

### **Reviews**

| Field      | Type     | Description      |
| ---------- | -------- | ---------------- |
| userId     | ObjectId | Reviewer         |
| movieId    | ObjectId | Movie            |
| rating     | Number   | 1-5 stars        |
| reviewText | String   | Review content   |
| createdAt  | Date     | Review timestamp |

### **Watchlist**

| Field   | Type     | Description |
| ------- | -------- | ----------- |
| userId  | ObjectId | User        |
| movieId | ObjectId | Movie       |
| addedAt | Date     | Date added  |

---

## **Setup and Installation**

### **Prerequisites**

* Node.js >= 18.x
* MongoDB (local or cloud)
* npm or yarn
* Git

### **Clone the repository**

```bash
git clone https://github.com/<your-username>/movie-review-platform.git
cd movie-review-platform
```

### **Backend Setup**

```bash
cd backend
npm install
```

* Create a `.env` file in `backend/` with:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/moviereview
JWT_SECRET=your_jwt_secret
```

* Start the server:

```bash
npm run dev
```

* Server runs at: `http://localhost:5000`

### **Frontend Setup**

```bash
cd ../frontend
npm install
npm start
```

* Frontend runs at: `http://localhost:3000`

---

## **How to Use**

1. **Register as admin** using Postman or frontend:

   * Endpoint: `POST /api/auth/register`
   * Body:

   ```json
   {
     "username": "admin",
     "email": "admin@example.com",
     "password": "admin123",
     "isAdmin": true
   }
   ```
2. **Login** to get JWT token:

   * Endpoint: `POST /api/auth/login`
   * Body:

   ```json
   {
     "email": "admin@example.com",
     "password": "admin123"
   }
   ```
3. **Add movies** (admin only):

   * Endpoint: `POST /api/movies`
   * Include JWT token in **Authorization header**:

     ```
     Bearer <token>
     ```
   * Body example:

   ```json
   {
     "title": "Inception",
     "genre": "Sci-Fi",
     "releaseYear": 2010,
     "director": "Christopher Nolan",
     "cast": ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
     "synopsis": "A mind-bending thriller about dreams within dreams.",
     "posterURL": "https://link-to-poster.jpg"
   }
   ```

---

## **Technologies Used**

* Frontend: **React, React Router, React Context**
* Backend: **Node.js, Express, JWT, express-validator**
* Database: **MongoDB**
* Real-time: **Socket.io**
* Other: **Axios, Cors, dotenv**

---

## **Future Enhancements**

* Movie recommendation system based on user ratings.
* Social features: follow users and see their reviews.
* Advanced search filters (multiple genres, release year, rating).
* Movie trailer integration.
* Real-time notifications for new reviews.
* Deployed version with CI/CD pipeline.

---

## **Contributing**

1. Fork the repository.
2. Create a branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature"`.
4. Push to branch: `git push origin feature-name`.
5. Open a pull request.

---

## **License**

This project is **open source** and available under the MIT License.

---

✅ This README covers:

* Project overview & objective
* Features (frontend/backend)
* API endpoints
* Database schema
* Setup & installation instructions
* Usage examples (admin & movies)
* Future enhancements

---

If you want, I can **also create a ready-to-use Postman collection for registering admin, logging in, and adding movies** for your project. This makes testing super easy.

Do you want me to do that?
