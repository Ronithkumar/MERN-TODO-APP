# 📝 MERN To-Do App

A **full-stack** To-Do application built with the powerful **MERN stack** (MongoDB, Express, React, Node.js).  
Stay organized and boost your productivity with this sleek, modern app! 🚀

---

## 📂 Project Structure

- **client/** — React frontend (UI/UX)  
- **server/** — Express backend API (server & database)

---

# Client (Frontend) 🚀

## About

The client is a React app bootstrapped with Create React App and styled using Tailwind CSS.  
Features user authentication, task management, profile updates, and more! 🔐✅

## Key Dependencies

- `react`, `react-dom`, `react-router-dom`  
- `axios` for API calls  
- `jwt-decode` for handling tokens  
- `tailwindcss` + `postcss` for styling  
- Testing libraries: `@testing-library/react`, `@testing-library/user-event`, etc.

## Getting Started

cd client  
npm install  
npm start  

Open your browser at `http://localhost:3000` 🌐

## Preview

![Login Screen](./client/login.png)

---

# Server (Backend) ⚙️

## About

Express server connected to MongoDB, handling authentication, tasks, and backend logic.  
Built for secure and scalable REST API services 🔒⚙️

## Key Dependencies

- `express` & `cors`  
- `mongoose` for MongoDB  
- `jsonwebtoken` for auth tokens  
- `bcrypt` for password hashing   
- `dotenv` for environment variables  
- `nodemon` (dev dependency) for hot reloading  

## Getting Started

cd server  
npm install  
npm run dev  

API runs on `http://localhost:5000` 🛠️

---

## 💡 Notes & Tips

- Don’t forget to add your `.env` files to `.gitignore`!  
- Ensure MongoDB is running and configured properly.  
- Run **both** client & server simultaneously for full functionality.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 👨‍💻 Author

Ronith Kumar

---

### Contributions & Feedback

Feel free to ⭐ the repo, submit issues, or contribute with pull requests!  
Let’s build great stuff together. 🤝🚀
