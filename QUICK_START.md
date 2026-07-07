# KaamFinder India - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Step 1: Clone & Install

```bash
# Navigate to project directory
cd "path/to/new pro"

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Step 2: Setup Environment

**Backend** - Create `backend/.env`:
```bash
MONGODB_URI=mongodb://localhost:27017/kaamfinder
JWT_SECRET=dev_secret_key_123
PORT=5000
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Frontend** - Create `frontend/.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Step 3: Start Development Servers

**Terminal 1 - Frontend**:
```bash
cd frontend
npm run dev
# Opens on http://localhost:3000
```

**Terminal 2 - Backend**:
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

### Step 4: Seed Sample Data

```bash
# Terminal 3 - From backend directory
cd backend
npm run seed
```

### Step 5: Start Using

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Test Accounts**:
  - Email: `rajesh@kaamfinder.com` | Pass: `password123`
  - Email: `buildpro@company.com` | Pass: `password123`

---

## 📁 Project Structure at a Glance

```
frontend/
├── src/app/           # Pages and routes
├── src/components/    # React components
├── src/lib/           # API calls
└── src/styles/        # Tailwind CSS

backend/
├── src/models/        # MongoDB schemas
├── src/routes/        # API endpoints
├── src/controllers/   # Business logic
└── src/config/        # Database config
```

---

## 🛠️ Common Commands

### Frontend
```bash
npm run dev        # Development server
npm run build      # Production build
npm start          # Run production build
npm run lint       # Lint code
```

### Backend
```bash
npm run dev        # Development server with hot reload
npm run build      # Compile TypeScript
npm start          # Run compiled code
npm run seed       # Seed sample data
```

---

## 🔗 Key API Endpoints

### Authentication
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get profile

### Jobs
- `GET /api/jobs` - List jobs
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Create job
- `POST /api/jobs/:id/apply` - Apply to job

---

## 🎨 Key Features to Explore

1. **Home Page** - Hero section with search
2. **Job Listing** - Browse with filters
3. **Authentication** - Login/Register
4. **Dashboard** - User dashboard
5. **Dark Mode** - Toggle in navbar
6. **Responsive Design** - Works on mobile

---

## 🐛 Troubleshooting

**Port Already in Use**:
```bash
# Find and kill process on port 3000 or 5000
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

**Database Connection Error**:
```bash
# Ensure MongoDB is running
# Or update MONGODB_URI in .env
```

**Module Not Found**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Next Steps

1. Customize colors/branding in tailwind.config.js
2. Add your Google Maps API key
3. Configure email service (SMTP)
4. Setup MongoDB Atlas for cloud database
5. Deploy to production (see DEPLOYMENT.md)

---

## 📚 Documentation

- Main README: `/README.md`
- Deployment Guide: `/DEPLOYMENT.md`
- API Documentation: Backend routes in `/src/routes/`

---

## ✅ Development Checklist

- [ ] Node.js installed (v18+)
- [ ] MongoDB running locally or configured
- [ ] Frontend running on localhost:3000
- [ ] Backend running on localhost:5000
- [ ] Sample data seeded
- [ ] Can login with test account
- [ ] Jobs display in feed
- [ ] Dark mode toggle works
- [ ] Mobile responsive verified

---

**Happy Coding! 🎉**
