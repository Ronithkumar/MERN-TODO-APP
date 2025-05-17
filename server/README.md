# Server - MERN To-Do App

This is the **backend (server)** part of the MERN To-Do App. It is built using **Node.js**, **Express**, and **MongoDB** to handle API requests, authentication, and database interactions.

## 🚀 Features

- User Authentication (JWT)
- CRUD operations for tasks
- Password encryption using bcrypt
- Environment variable support using dotenv
- MongoDB database connection via Mongoose
- CORS configuration

## 📦 Dependencies

### Runtime Dependencies

- **bcrypt** `^5.1.1` - Password hashing.
- **cors** `^2.8.5` - Enable Cross-Origin Resource Sharing.
- **dotenv** `^16.5.0` - Load environment variables.
- **express** `^5.1.0` - Web framework for Node.js.
- **jsonwebtoken** `^9.0.2` - JWT for authentication.
- **mongoose** `^8.14.1` - MongoDB object modeling.

### Development Dependencies

- **nodemon** `^3.1.10` - Monitor and auto-restart during development.

## 📁 Folder Structure

```
server/
│
├── config/                 # DB config and connections
├── controllers/           # Controller logic for users and tasks
├── middleware/            # Middleware for authentication
├── models/                # Mongoose models for User and Task
├── routes/                # Routes for users and tasks
├── .env                   # Environment variables
├── server.js              # Entry point
```

## ⚙️ Setup

1. Navigate to the `server` folder:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and add your environment variables.

4. Start the server in development:
   ```bash
   npm run dev
   ```

## 🔐 Environment Variables

Add the following to your `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

---

## 📬 API Endpoints

- `POST /api/users/signup`
- `POST /api/users/login`
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

---

## 📝 License

This project is licensed under the ISC License.
