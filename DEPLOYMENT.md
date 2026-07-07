# KaamFinder India - Deployment Guide

## 🚀 Deployment Instructions

This guide covers deploying KaamFinder to production platforms.

### Prerequisites
- GitHub account for source control
- Vercel account (for frontend)
- MongoDB Atlas account (for database)
- Environment variables configured

---

## Frontend Deployment (Vercel)

### Step 1: Prepare Your Repository

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: KaamFinder India"

# Add remote repository
git remote add origin <your-github-repo>
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel --prod
```

#### Option B: Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Select your GitHub repository
4. Configure settings:
   - **Framework**: Next.js
   - **Root Directory**: frontend
   - **Build Command**: npm run build
   - **Output Directory**: .next

#### Step 3: Set Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```
NEXT_PUBLIC_API_URL=https://api.kaamfinder.com/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id
```

---

## Backend Deployment (Railway / Render / Heroku)

### Using Railway.app (Recommended)

#### Step 1: Prepare Backend

```bash
cd backend

# Create .env file
cp .env.example .env
```

#### Step 2: Deploy

1. Go to https://railway.app
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Connect your repository
5. Select the backend directory

#### Step 3: Add Environment Variables

In Railway Dashboard → Variables, add all .env variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kaamfinder
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=production
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
FRONTEND_URL=https://your-domain.vercel.app
```

#### Step 4: Deploy

Railway automatically deploys on push to GitHub.

---

## Database Deployment (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up / Login
3. Create a new project

### Step 2: Create Cluster

1. Click "Build a Cluster"
2. Choose "Shared" tier (free)
3. Select your region (close to your users)
4. Click "Create Cluster"

### Step 3: Setup Database Access

1. Go to "Database Access"
2. Click "Add New Database User"
3. Create username and password
4. Click "Add User"

### Step 4: Configure Network Access

1. Go to "Network Access"
2. Click "Add IP Address"
3. Add your deployment server's IP or "0.0.0.0/0" (allow all)

### Step 5: Get Connection String

1. Click "Connect" on your cluster
2. Select "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password

Use this in your backend .env:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kaamfinder
```

---

## Custom Domain Setup

### Add Domain to Vercel

1. Vercel Dashboard → Settings → Domains
2. Enter your domain name
3. Follow DNS configuration instructions
4. Update nameservers at your domain provider

### Update API URL

Update frontend environment variable:
```
NEXT_PUBLIC_API_URL=https://api.your-domain.com/api
```

---

## Post-Deployment Checklist

- [ ] Frontend loads and homepage displays
- [ ] Backend API responding at `/health` endpoint
- [ ] Database connection working
- [ ] Authentication (login/register) functional
- [ ] Job search working with filters
- [ ] Google Maps loading correctly
- [ ] Images loading from CDN
- [ ] Dark mode toggle working
- [ ] Mobile responsive design verified
- [ ] HTTPS/SSL enabled
- [ ] Environment variables all set
- [ ] Database backed up regularly
- [ ] Monitoring and error tracking configured

---

## Monitoring & Logs

### Vercel Logs
- Dashboard → Deployments → Logs
- Real-time logs for debugging

### Railway/Render Logs
- Dashboard → View Logs
- Streaming logs available

### MongoDB Logs
- Atlas → Logs → Atlas Activity

---

## Scaling Considerations

### When Traffic Increases

1. **Frontend**: Vercel automatically scales
2. **Backend**: Upgrade Railway plan or use horizontal scaling
3. **Database**: Upgrade MongoDB cluster tier
4. **Static Assets**: Use CDN for images/media
5. **Caching**: Implement Redis for frequently accessed data

---

## Performance Optimization

### Frontend
```bash
# Enable production mode
NEXT_PUBLIC_ENV=production

# Optimize images
# Use next/image component
# Enable automatic compression
```

### Backend
```typescript
// Enable compression
import compression from 'compression';
app.use(compression());

// Implement rate limiting
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);
```

### Database
- Create indexes on frequently queried fields
- Archive old records
- Regular backups

---

## Rollback Procedure

### Vercel
1. Dashboard → Deployments
2. Find previous deployment
3. Click "Redeploy"

### Railway/Render
1. Dashboard → Deployments
2. Select previous build
3. Click "Redeploy"

### Git Rollback
```bash
git revert <commit-hash>
git push origin main
```

---

## Troubleshooting

### Frontend Won't Load
- Check Vercel build logs
- Verify environment variables
- Clear browser cache
- Check API URL configuration

### Backend Errors
- Check Railway/Render logs
- Verify database connection
- Ensure all environment variables set
- Check API endpoints responding

### Database Connection Issues
- Verify connection string
- Check IP whitelist on MongoDB
- Ensure user permissions correct
- Test connection locally first

---

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [MongoDB Atlas Help](https://docs.atlas.mongodb.com)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Express Deployment](https://expressjs.com/en/advanced/best-practice-performance.html)

---

## Production URLs

Once deployed, your URLs will be:

- **Frontend**: https://your-domain.vercel.app
- **Backend**: https://api.railway.app/api
- **Database**: MongoDB Atlas cloud database
- **Static Files**: CDN (Vercel CDN for images)

---

**Congratulations! KaamFinder is now live in production! 🎉**
