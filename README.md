# 🏛️ PRAchi Online Services — CSC Management Web App

A full-stack **MERN** (MongoDB, Express, React, Node.js) web application for managing a Common Service Center (CSC). Customers can browse services and submit requests online; admins manage everything from a secure dashboard.

---

## 📁 Project Structure

```
csc-mern-project/
├── client/                   # React frontend
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── api.js            # Axios instance with JWT interceptor
│       ├── App.js            # Routes
│       ├── index.js
│       ├── index.css         # Global design system
│       ├── context/
│       │   └── AuthContext.js
│       ├── components/
│       │   ├── Navbar.js / .css
│       │   ├── Footer.js / .css
│       │   └── AdminLayout.js / .css
│       └── pages/
│           ├── Home.js / .css
│           ├── Services.js / .css
│           ├── RequestForm.js / .css
│           ├── Contact.js / .css
│           ├── AdminLogin.js / .css
│           ├── AdminDashboard.js / .css
│           ├── AdminRequests.js / .css
│           └── AdminServices.js / .css
│
├── server/                   # Node + Express backend
│   ├── server.js
│   ├── seed.js               # One-time DB seed script
│   ├── .env.example
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Service.js
│   │   └── ServiceRequest.js
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── serviceController.js
│   │   └── requestController.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── serviceRoutes.js
│   │   └── requestRoutes.js
│   └── middleware/
│       └── authMiddleware.js
│
├── package.json              # Root scripts (runs both together)
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd csc-mern-project
npm run install-all
```

### 2. Configure Environment

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/csc_db
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:3000
```

### 3. Seed the Database

```bash
npm run seed
```

This creates:
- **Admin account** → username: `admin` | password: `admin123`
- **12 sample services** (Aadhar, PAN, etc.)

### 4. Run the App

```bash
# Run both frontend and backend together
npm run dev
```

- Frontend: http://localhost:3000  
- Backend API: http://localhost:5000

---

## 🔑 Admin Access

| URL | Purpose |
|-----|---------|
| `/admin/login` | Admin login page |
| `/admin` | Dashboard with stats |
| `/admin/requests` | Manage service requests |
| `/admin/services` | Add/edit/delete services |

Default credentials (after seeding):
- **Username:** `admin`
- **Password:** `admin123`

---

## 🌐 API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/services` | Get all active services |
| POST | `/api/request` | Submit a service request |

### Admin (JWT protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/stats` | Dashboard statistics |
| GET | `/api/admin/requests` | Get all requests |
| PUT | `/api/admin/request/:id` | Update request status |
| DELETE | `/api/admin/request/:id` | Delete a request |
| GET | `/api/admin/services` | Get all services |
| POST | `/api/admin/service` | Add a service |
| PUT | `/api/admin/service/:id` | Update a service |
| DELETE | `/api/admin/service/:id` | Delete a service |

---

## 🗄️ Database Collections

### ServiceRequest
| Field | Type | Notes |
|-------|------|-------|
| name | String | Required |
| phone | String | 10-digit Indian mobile |
| email | String | Optional |
| service | String | Required |
| message | String | Optional |
| status | Enum | Pending / In Progress / Completed / Cancelled |
| adminNote | String | Admin internal note |

### Service
| Field | Type | Notes |
|-------|------|-------|
| name | String | Required |
| price | Number | 0 = free |
| description | String | Required |
| category | Enum | Government / Banking / Insurance / Utility / Education / Other |
| isActive | Boolean | Controls visibility on website |

### Admin
| Field | Type | Notes |
|-------|------|-------|
| username | String | Unique, lowercase |
| password | String | Hashed with bcrypt |

---

## ☁️ Deployment

### Frontend → Vercel / Netlify
```bash
cd client
npm run build
# Upload the build/ folder
```
Set environment variable: `REACT_APP_API_URL=https://your-backend.render.com/api`

### Backend → Render / Railway
- Set root directory to `server/`
- Start command: `node server.js`
- Add all `.env` variables in the dashboard

### Database → MongoDB Atlas
1. Create a free cluster at mongodb.com/atlas
2. Whitelist IP: `0.0.0.0/0` (for cloud hosting)
3. Copy the connection string to `MONGO_URI`

---

## 🔮 Future Enhancements
- Customer login & request tracking portal
- Online payment integration (Razorpay)
- SMS notifications (Twilio/Fast2SMS)
- File upload for documents (Cloudinary)
- Multi-language support (Marathi, Hindi)
- WhatsApp bot integration

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Axios, React Toastify |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT + bcryptjs |
| Styling | Custom CSS with CSS Variables |
| Deployment | Vercel (FE) + Render (BE) + MongoDB Atlas (DB) |

---

*Built for PRAchi Online Services, Jalgaon, Maharashtra 🇮🇳*
