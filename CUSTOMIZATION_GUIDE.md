# KaamFinder India - Developer's Customization Guide

## ✨ How to Customize & Extend

This guide helps you customize KaamFinder for your specific needs.

---

## 🎨 Branding & Design

### Change Colors

Edit `frontend/tailwind.config.js`:

```javascript
// Change primary color (Orange)
primary: {
  500: '#your-hex-code', // Change to your brand color
}

// Change secondary color (Blue)
secondary: {
  500: '#your-hex-color',
}
```

### Change Logo

1. Replace `frontend/public/logo.png` with your logo
2. Update Navbar component: `frontend/src/components/common/Navbar.tsx`
3. Update Footer component: `frontend/src/components/common/Footer.tsx`

### Change App Name

Search and replace:
```
KaamFinder → Your App Name
kaamfinder → your-app-name
```

### Customize Homepage

Edit `frontend/src/app/page.tsx`:
- Update hero text
- Modify category cards
- Change featured jobs display
- Update CTA buttons

---

## 🗄️ Database Customization

### Add New Job Categories

Edit `backend/src/models/Job.ts`:

```typescript
category: {
  type: String,
  enum: [
    'Labour',
    'Driver',
    'Delivery',
    'Construction',
    // Add your categories here
    'Your Category',
  ],
},
```

Also update:
- `frontend/src/app/page.tsx` (categories array)
- `frontend/src/app/jobs/page.tsx` (jobCategories array)

### Add New User Fields

Edit `backend/src/models/User.ts`:

```typescript
// Add custom fields
industry: String,
certifications: [String],
workHistory: [{
  company: String,
  position: String,
  duration: String,
}],
```

Then update:
- Frontend forms to collect these fields
- API response handling

### Add New Collections

1. Create model in `backend/src/models/`
2. Create controller in `backend/src/controllers/`
3. Create routes in `backend/src/routes/`
4. Update main server file: `backend/src/index.ts`

---

## 📱 Feature Additions

### Add Chat Feature

Already scaffolded with Socket.io:

1. Install Socket.io client: `npm install socket.io-client`
2. Create chat component: `frontend/src/components/chat/ChatWindow.tsx`
3. Implement chat routes in backend
4. Initialize Socket.io in backend

### Add Notifications

Framework ready in models:

1. Create notification component
2. Setup real-time listeners
3. Configure notification types
4. Add notification panel to dashboard

### Add Payments

1. Integrate Razorpay/Stripe
2. Create payment controller
3. Add payment routes
4. Create payment UI component
5. Track transactions in database

### Add Admin Panel

1. Create admin routes: `frontend/src/app/admin/`
2. Add admin components
3. Setup admin controller in backend
4. Implement admin middleware

---

## 🔧 API Modifications

### Add New Endpoint

1. Create in controller: `backend/src/controllers/yourController.ts`
2. Add route: `backend/src/routes/yourRoutes.ts`
3. Register in server: `backend/src/index.ts`
4. Create API utility: `frontend/src/lib/api.ts`
5. Use in components

Example:

```typescript
// Backend controller
export const searchWorkers = async (req, res) => {
  // Implementation
};

// Frontend utility
export const workersAPI = {
  search: (params: any) => api.get('/workers/search', { params }),
};
```

### Modify Existing Endpoint

1. Update controller logic
2. Update TypeScript types if needed
3. Update frontend API call
4. Update component/page using it

---

## 🎯 UI/UX Changes

### Add New Page

1. Create directory: `frontend/src/app/yourpage/`
2. Create file: `page.tsx`
3. Add route to navbar if needed: `frontend/src/components/common/Navbar.tsx`

### Modify Layout

Main layout: `frontend/src/app/layout.tsx`

Add new sections, change structure:

```typescript
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {/* Your custom structure */}
        {children}
      </body>
    </html>
  );
}
```

### Create New Component

Example: `frontend/src/components/jobs/NewComponent.tsx`

```typescript
'use client';

export default function NewComponent() {
  return (
    <div>
      {/* Your component */}
    </div>
  );
}
```

---

## 🔐 Authentication Modifications

### Add Third-Party OAuth

Example: GitHub OAuth

1. Get credentials from GitHub
2. Update `.env` files
3. Add to `authController.ts`:

```typescript
export const githubAuth = async (req, res) => {
  // Implementation
};
```

4. Create frontend component for GitHub login

### Change Password Requirements

Edit `backend/src/controllers/authController.ts`:

```typescript
// Add validation
if (password.length < 8) {
  return res.status(400).json({ message: 'Password too short' });
}
```

---

## 📊 Analytics & Tracking

### Add Google Analytics

1. Install: `npm install next-google-analytics`
2. Add to app layout
3. Configure with your tracking ID
4. Track custom events

### Add Error Tracking

1. Sign up at Sentry.io
2. Install: `npm install @sentry/nextjs`
3. Initialize in `frontend/src/app/layout.tsx`
4. Initialize in backend

### Add Performance Monitoring

Use Next.js built-in: `next/performance`

---

## 💾 Database Optimization

### Add Indexes

In MongoDB:

```javascript
db.jobs.createIndex({ "location.lat": 1, "location.lng": 1 })
db.jobs.createIndex({ category: 1 })
db.users.createIndex({ email: 1 })
```

### Archive Old Data

Create script: `backend/src/scripts/archive.ts`

```typescript
export const archiveOldJobs = async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await Job.deleteMany({ updatedAt: { $lt: thirtyDaysAgo } });
};
```

---

## 🚀 Performance Improvements

### Frontend Optimization

1. Enable Static Generation for pages:

```typescript
export const revalidate = 3600; // Revalidate every hour
```

2. Optimize images:

```typescript
import Image from 'next/image';

<Image
  src="image.jpg"
  alt="description"
  width={300}
  height={300}
  priority
/>
```

### Backend Optimization

1. Add caching:

```typescript
import redis from 'redis';
const client = redis.createClient();

// Cache job results
const cached = await client.get('jobs:' + cacheKey);
```

2. Add pagination:

```typescript
const limit = 10;
const skip = (page - 1) * limit;
const jobs = await Job.find().skip(skip).limit(limit);
```

---

## 📧 Email Integration

Add nodemailer in backend:

```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({ to, subject, html });
};
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: vercel --prod
```

---

## 📝 Environment-Specific Config

### Development

`.env.development`:
```
NODE_ENV=development
DEBUG=true
LOG_LEVEL=debug
```

### Production

`.env.production`:
```
NODE_ENV=production
DEBUG=false
LOG_LEVEL=error
```

### Testing

`.env.test`:
```
NODE_ENV=test
MONGODB_URI=mongodb://localhost:27017/kaamfinder-test
```

---

## 🧪 Testing Setup

### Backend Tests

Install: `npm install jest @types/jest ts-jest`

Create `backend/jest.config.js`:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
```

### Frontend Tests

Install: `npm install @testing-library/react @testing-library/jest-dom`

Create tests in `__tests__` directory

---

## 📱 PWA Configuration

Already partially configured. To fully implement:

1. Create `manifest.json` in `public/`
2. Update `next.config.js` with PWA plugin
3. Create service worker
4. Add install prompts to UI

---

## 🌍 Multi-Language Support

1. Install: `npm install next-i18next`
2. Create translation files
3. Setup i18n configuration
4. Add language selector to navbar
5. Wrap components with useTranslation hook

---

## 📊 Advanced Features Roadmap

Suggested additions for future versions:

- [ ] Video calling (Twilio)
- [ ] AI job recommendations
- [ ] Mobile app (React Native)
- [ ] Resume builder
- [ ] Advanced analytics
- [ ] Marketplace for skills
- [ ] Subscription plans
- [ ] Advanced search filters
- [ ] Machine learning matching
- [ ] Blockchain verification

---

## 🎓 Code Quality

### Linting

```bash
# Frontend
npm run lint

# Backend
npm run lint
```

### Type Checking

```bash
# Frontend
npm run type-check

# Backend
npm run type-check
```

### Code Formatting

Install: `npm install prettier`

Create `.prettierrc`:
```json
{
  "singleQuote": true,
  "trailingComma": "es5",
  "semi": true
}
```

---

## 📚 Resources for Developers

- Next.js Docs: https://nextjs.org/docs
- Express Docs: https://expressjs.com/
- MongoDB Docs: https://docs.mongodb.com/
- Tailwind CSS: https://tailwindcss.com/docs
- React Docs: https://react.dev/

---

## 🤝 Contributing Guidelines

1. Fork the repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Make changes and test
4. Commit: `git commit -m "Add your feature"`
5. Push: `git push origin feature/your-feature`
6. Create Pull Request

---

## 🐛 Common Issues & Solutions

### Port Already in Use

```bash
# Find process on port 3000
lsof -ti:3000

# Kill it
kill -9 <PID>
```

### Module Not Found

```bash
# Clear and reinstall
rm -rf node_modules
npm install
```

### Database Connection Error

```bash
# Check MongoDB running
mongod

# Update connection string
MONGODB_URI=mongodb://localhost:27017/kaamfinder
```

---

**Happy Coding! 🚀**

For more information, refer to the main documentation files in the project root.
