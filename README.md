# Blog Management System API

A modern RESTful API for a blogging platform, built with Node.js, Express, and MongoDB (Mongoose). This API supports robust user authentication, role-based access, blog and comment management, and advanced features for both content creators and readers.

---

## 🚀 Features

- **User Authentication**: Register, login, and secure endpoints with JWT
- **Role-Based Access**: Admin, Blogger, and Guest roles with tailored permissions
- **Blog Management**: Create, read, update, and delete blogs
- **Comment System**: Add, view, edit, and delete comments on blogs
- **Category & Search**: Filter blogs by category and search by title
- **Pagination**: Efficient blog listing for large datasets
- **Validation**: Yup-based request validation for all endpoints
- **Secure Middleware**: Authentication, role checks, and MongoDB ID validation

---

## 🛠️ Tech Stack

| Purpose           | Technology            |
| ----------------- | --------------------- |
| Runtime           | Node.js               |
| Framework         | Express.js            |
| Database          | MongoDB + Mongoose    |
| Authentication    | JWT (JSON Web Tokens) |
| Password Hashing  | bcrypt                |
| Validation        | Yup                   |
| Development Tools | Nodemon               |

---

## 📋 Prerequisites

- Node.js (v16 or above recommended)
- MongoDB Atlas or local MongoDB instance

---

## ⚡ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/smritibk/blog-api.git
   cd blog-api
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure environment variables**
   Create a `.env` file in the root directory with:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=8000
   ```
4. **Start the server**
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:8000`

---

## 📚 API Endpoints

### User Endpoints

- `POST /user/register` — Register a new user
- `POST /user/login` — Login and receive JWT token
- `GET /user/all` — Get all users (admin only)
- `GET /user/:id` — Get user by ID
- `PUT /user/update/:id` — Update user by ID (self only)
- `DELETE /user/delete/:id` — Delete user by ID (admin only)
- `GET /user/me` — Get currently logged-in user

### Blog Endpoints

- `POST /blog/read` — List all blogs (paginated, searchable)
- `POST /blog/add` — Add a new blog (blogger only)
- `PUT /blog/edit/:id` — Edit a blog (author only)
- `DELETE /blog/delete/:id` — Delete a blog (author or admin)
- `GET /blog/view-by-category/:category` — View blogs by category

### Comment Endpoints

- `POST /comment/add/:id` — Add a comment to a blog (guest only)
- `GET /comment/view/:id` — View all comments for a blog (all users)
- `PUT /comment/edit/:id` — Edit a comment (author only)
- `DELETE /comment/delete/:id` — Delete a comment (author or admin)

---

## 🔐 Authentication & Authorization

All protected endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

### User Roles

- **Admin**: Full access to all features
- **Blogger**: Can manage their own blogs
- **Guest**: Can comment and view blogs

---

## 🏗️ Project Structure

```
blog-api/
├── blog/
│   ├── blog.controller.js
│   ├── blog.model.js
│   └── blog.validation.js
├── comment/
│   ├── comment.controller.js
│   ├── comment.model.js
│   └── comment.validation.js
├── user/
│   ├── user.controller.js
│   ├── user.model.js
│   └── user.validation.js
├── constants/
│   └── general.constants.js
├── middleware/
│   ├── authentication.middleware.js
│   ├── validate.mongoid.js
│   └── validate.req.body.js
├── db.connect.js
├── index.js
├── package.json
└── README.md
```

---

## 📝 Environment Variables

| Variable      | Description               | Default  |
| ------------- | ------------------------- | -------- |
| `MONGODB_URI` | MongoDB connection string | Required |
| `JWT_SECRET`  | Secret key for JWT tokens | Required |
| `PORT`        | Server port               | 8000     |

---

## 📄 License

This project is licensed under the MIT License.

---

**Note**: Update your MongoDB connection string and JWT secret in `.env` before running the application.
