# Chat App Backend 🚀
## Requirement Node >= 20.x
## 📌 Overview

Backend cho ứng dụng chat realtime, cung cấp:

* Authentication (JWT)
* User management
* Friend system
* Conversation management
* Message handling
* Realtime communication (Socket.io)

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* Socket.io
* JWT (Authentication)

---

## 📁 Project Structure

```bash
src/
├── config/         # Cấu hình (DB, env, constants)
├── controllers/    # Xử lý request/response
├── docker/         # build node/nginx/db/redis 
├── services/       # Business logic
├── repositories/   # Làm việc với database (MongoDB)
├── models/         # Mongoose schema (User, Message, Conversation...)
├── routes/         # Định nghĩa API routes
├── middlewares/    # Middleware (auth, error handler...)
├── sockets/        # Socket.io setup & events
├── utils/          # Helper functions
├── app.js          # Khởi tạo express app
├── server.js       # Start server + socket
```

---

## 🧠 Architecture

```text
Route → Controller → Service → Repository → Database
```

### Giải thích

* **Route**: định nghĩa endpoint
* **Controller**: nhận request, trả response
* **Service**: xử lý business logic
* **Repository**: query DB
* **Model**: schema MongoDB

---

## ⚙️ Setup

### 1. Clone project

```bash
git clone <repo>
cd be-chat-demo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment

Tạo file `.env`

```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173
```

### 4. Run server

```bash
npm run dev
```

---

## 🔐 Authentication

* Sử dụng JWT
* Token gửi qua header:

```http
Authorization: Bearer <token>
```

### Flow

```text
Register → Login → trả token
→ Client lưu token
→ Gửi kèm mỗi request
```

---

## 📡 API Endpoints (Core)

### Auth

```http
POST /auth/register
POST /auth/login
```

### User

```http
GET /users
GET /users/search
PUT /users/profile
```

### Friend

```http
POST /friends/request
GET /friends/requests
POST /friends/accept
GET /friends
```

### Conversation

```http
GET /conversations
POST /conversation
```

### Message

```http
GET /messages/:conversationId
POST /messages
```

---

## 💬 Socket (Realtime)

### Connection

```text
Client connect → gửi userId
```

### Events

```text
join_room(roomId)
send_message(data)
receive_message(data)
```

### Flow

```text
User A gửi message
→ Server emit vào room
→ User B nhận realtime
```

---

## 🗄 Database Models

### User

* username
* name
* email
* password
* avatar

### Conversation

* members (ref User)
* type (private/group)

### Message

* conversationId
* senderId
* content
* createdAt

### FriendRequest

* fromUserId
* toUserId
* status (pending/accepted)

---

## 🔥 Important Notes

* Luôn dùng `populate()` khi cần lấy thông tin user
* Validate ObjectId trước khi query
* Handle lỗi 401 (Unauthorized)

---

## 🐳 Docker (optional)

```bash
docker-compose up --build
docker-compose logs -f node
```

---

## 🚀 Deploy

### Backend

* VPS / EC2

### Database

* MongoDB Atlas

---

## 📈 Future Improvements

* Refresh token
* Rate limiting
* Logging system
* File upload (image, video)
* Group chat

---

## 👨‍💻 Author

Nguyen The Duyet
