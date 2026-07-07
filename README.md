# KaamFinder India - Modern Job Portal

A production-ready, full-stack job portal application built with Next.js, React, Express, and MongoDB. Designed specifically for finding local job opportunities across India, including formal jobs, daily wage workers, and labour jobs.

## 🎯 Features

### Core Features
- **Job Search**: Advanced filtering by location, distance, category, salary, and job type
- **Geolocation**: Find jobs near you using Google Maps
- **Multiple Authentication**: Email/Password, Google Login, Mobile OTP
- **Worker Profiles**: Create detailed profiles with skills, experience, and portfolio
- **Employer Dashboard**: Post jobs, manage applications, track candidates
- **Job Categories**: 10+ categories including Labour, Driver, Delivery, Construction, etc.
- **One-Click Apply**: Quick application with WhatsApp and call options
- **Dark Mode**: Full dark mode support
- **PWA Ready**: Progressive Web App support for offline access
- **Responsive Design**: Mobile-first responsive design with Tailwind CSS

### AI Features
- Job recommendations
- Resume builder
- Skill suggestions
- Salary estimation

### Additional Features
- Admin panel for moderation
- Notifications system
- Chat between workers and employers
- Reviews and ratings
- Saved jobs
- Application tracking

## 🏗️ Project Structure

```
kaamfinder/
├── frontend/                 # Next.js + React frontend
│   ├── src/
│   │   ├── app/             # Next.js app directory
│   │   ├── components/      # Reusable components
│   │   ├── context/         # Auth and state management
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # API calls and utilities
│   │   └── styles/          # Global styles
│   ├── public/              # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/                  # Express + MongoDB backend
│   ├── src/
│   │   ├── config/          # Database and config
│   │   ├── controllers/     # Business logic
│   │   ├── middleware/      # Auth and error handling
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API endpoints
│   │   ├── utils/           # Helper functions
│   │   ├── scripts/         # Database seeding
│   │   └── index.ts         # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
└── README.md                # This file
```

## 📱 Pages

### Public Pages
- **Home** (`/`): Landing page with search, categories, and featured jobs
- **Browse Jobs** (`/jobs`): Job listing with advanced filters
- **Job Details** (`/jobs/:id`): Detailed job information
- **Login** (`/login`): Authentication
- **Register** (`/register`): User registration
- **About** (`/about`): Company information
- **Contact** (`/contact`): Contact form

### Protected Pages
- **Dashboard** (`/dashboard`): Worker/Employer dashboard
- **Worker Profile** (`/profile`): Edit profile and skills
- **Employer Dashboard** (`/employer`): Post and manage jobs
- **Applications** (`/applications`): View applications
- **Saved Jobs** (`/saved`): Bookmarked jobs

## 🗄️ Database Schema

### Collections

**Users**
- Personal information
- Authentication credentials
- Skills and experience
- Location and verification status
- Rating and review count

**Jobs**
- Title, description, requirements
- Salary and job type
- Location with geolocation
- Category and experience level
- Applicant tracking

**Applications**
- Job and user references
- Application status
- Application date and notes
- Applied via (direct/WhatsApp/call)

**Companies**
- Company details and branding
- Owner reference
- Employee list
- Job count and rating

**Reviews**
- Rater and ratee information
- Rating score
- Review text
- Timestamp

**Notifications**
- User reference
- Notification type and content
- Read/unread status

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **State Management**: Zustand + Context API
- **Forms**: React Hook Form
- **Maps**: Google Maps React
- **Icons**: Lucide React
- **Theme**: next-themes (Dark mode)
- **HTTP Client**: Axios
- **Validation**: Zod

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **Authentication**: JWT + Google OAuth
- **Validation**: Joi
- **File Upload**: Multer + Cloudinary
- **Real-time**: Socket.io
- **Caching**: Redis
- **Email**: Nodemailer

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- MongoDB instance (local or cloud)
- Git

### Installation

#### 1. Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd kaamfinder

# Install dependencies
cd frontend
npm install

cd ../backend
npm install
```

#### 2. Environment Variables

```bash
# Backend - create backend/.env
MONGODB_URI=mongodb://localhost:27017/kaamfinder
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_secret

# Frontend - create frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

#### 3. Database Setup

```bash
# From backend directory
npm run seed
```

#### 4. Start Development Servers

```bash
# Terminal 1 - Frontend (from frontend directory)
npm run dev

# Terminal 2 - Backend (from backend directory)
npm run dev

# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

## 📖 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/google` - Google authentication
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update profile

### Jobs
- `GET /api/jobs` - Get all jobs with filtering
- `GET /api/jobs/:id` - Get job details
- `GET /api/jobs/nearby` - Get nearby jobs
- `GET /api/jobs/search` - Search jobs
- `POST /api/jobs` - Create job (employer only)
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `POST /api/jobs/:id/apply` - Apply to job

### Applications
- `GET /api/applications/my` - Get user's applications
- `GET /api/applications/job/:jobId` - Get job applicants
- `PATCH /api/applications/:id` - Update application status
- `GET /api/applications/stats` - Get application statistics

## 🎨 Design System

### Colors
- **Primary**: Orange (#f97316)
- **Secondary**: Blue (#0ea5e9)
- **Background**: White/Dark Slate
- **Text**: Gray-900/White

### Components
- Reusable UI components with Tailwind CSS
- Custom hooks for geolocation and filters
- Form validation with React Hook Form
- Error boundaries and loading states

## 📦 Deployment

### Frontend (Vercel)
```bash
# Automatic deployment from GitHub
# Settings → GitHub → Connect repository
# Environment variables configured in Vercel dashboard
```

### Backend (Heroku/Railway/Render)
```bash
# Prepare for deployment
npm run build

# Deploy using platform CLI
# Set environment variables in dashboard
```

### Database (MongoDB Atlas)
```bash
# Use MongoDB Atlas for cloud database
# Update MONGODB_URI in backend .env
```

## 📱 Mobile Responsiveness

- Mobile-first design approach
- Optimized for iOS and Android
- Touch-friendly interface
- Fast loading times
- PWA support for app-like experience

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- CORS configuration
- Input validation with Joi/Zod
- Protected API routes
- Role-based access control (RBAC)
- Secure environment variables

## 📊 Performance

- Server-side rendering with Next.js
- Image optimization
- Code splitting
- Lazy loading
- Caching strategies
- Database indexing
- CDN-ready architecture

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

- Email: support@kaamfinder.com
- Phone: +91 9876543210
- Website: www.kaamfinder.com

## 🚀 Roadmap

- [ ] Video resume support
- [ ] AI-powered job matching
- [ ] Mobile app (React Native)
- [ ] Video call integration
- [ ] Job alerts and subscriptions
- [ ] Multi-language support
- [ ] Payment integration
- [ ] Analytics dashboard

## 👨‍💻 Development Tips

### Frontend Development
```bash
# Hot reload enabled
npm run dev

# Build for production
npm run build

# Run production build locally
npm start
```

### Backend Development
```bash
# Hot reload with nodemon
npm run dev

# Build TypeScript
npm run build

# Run compiled code
npm start

# Seed database
npm run seed
```

### Best Practices
- Use components for reusable UI
- Keep hooks in the hooks directory
- Store API calls in lib/api.ts
- Use context for global state
- Write meaningful commit messages
- Test before submitting PR

## 📝 Notes for Deployment

1. **Environment Variables**: Ensure all .env variables are set correctly
2. **Database**: Create MongoDB Atlas account for cloud database
3. **API Keys**: Get Google Maps and Cloudinary credentials
4. **CORS**: Update CORS settings for production domain
5. **SSL**: Enable SSL/HTTPS for security
6. **Monitoring**: Set up error tracking and analytics

---

**Happy Coding! 🎉**

For more information, visit [KaamFinder Official Website](www.kaamfinder.com)
