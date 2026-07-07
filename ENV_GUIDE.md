# Environment Variables Guide

## Frontend (.env.local)

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

# Deployment Environments
# Development
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Production
NEXT_PUBLIC_API_URL=https://api.your-domain.com/api
```

## Backend (.env)

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/kaamfinder
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kaamfinder

# Server
PORT=5000
NODE_ENV=development

# JWT Secret (Change this in production!)
JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary (for image uploads)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Service (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Redis (optional, for caching)
REDIS_URL=redis://localhost:6379

# URLs
FRONTEND_URL=http://localhost:3000
API_URL=http://localhost:5000/api
```

## Getting API Keys

### Google Maps API
1. Go to https://console.cloud.google.com/
2. Create a new project
3. Enable Maps JavaScript API
4. Create API key
5. Restrict key to browser origins

### Google OAuth
1. Go to https://console.cloud.google.com/
2. Create OAuth 2.0 credentials (Web application)
3. Add authorized origins: http://localhost:3000
4. Copy Client ID and Secret

### Cloudinary (for image uploads)
1. Sign up at https://cloudinary.com/
2. Go to Dashboard
3. Copy Cloud Name, API Key, API Secret

### SMTP (for emails)
1. Use Gmail: https://myaccount.google.com/apppasswords
2. Generate app password
3. Use in SMTP_PASSWORD

### MongoDB Atlas (for cloud database)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create account
3. Create cluster
4. Get connection string
5. Add to MONGODB_URI

## Production Checklist

- [ ] Change JWT_SECRET to a strong random string
- [ ] Use MongoDB Atlas for production database
- [ ] Get real API keys (Maps, OAuth, Cloudinary)
- [ ] Set NODE_ENV=production
- [ ] Configure SSL/HTTPS
- [ ] Set up email service
- [ ] Add error tracking (Sentry)
- [ ] Configure analytics
- [ ] Set up backups
- [ ] Enable rate limiting
- [ ] Add monitoring
