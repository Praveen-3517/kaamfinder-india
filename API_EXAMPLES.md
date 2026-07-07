# API Response Examples

## Authentication APIs

### Register
```json
POST /api/auth/register
{
  "firstName": "Rajesh",
  "lastName": "Kumar",
  "email": "rajesh@example.com",
  "phone": "+919876543210",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "worker"
}

Response: 201
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Rajesh Kumar",
    "email": "rajesh@example.com",
    "role": "worker"
  }
}
```

### Login
```json
POST /api/auth/login
{
  "email": "rajesh@example.com",
  "password": "password123"
}

Response: 200
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Rajesh Kumar",
    "email": "rajesh@example.com",
    "role": "worker"
  }
}
```

## Jobs APIs

### Get All Jobs
```json
GET /api/jobs?category=Labour&jobType=Daily Wage&page=1&limit=10

Response: 200
{
  "jobs": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Construction Laborer",
      "description": "We are looking for experienced construction laborers...",
      "category": "Construction",
      "salary": {
        "min": 500,
        "max": 800,
        "currency": "INR",
        "period": "daily"
      },
      "jobType": "Daily Wage",
      "location": {
        "address": "123 Construction Site",
        "lat": 19.0760,
        "lng": 72.8777,
        "city": "Mumbai",
        "state": "Maharashtra"
      },
      "skills": ["Manual Labor", "Carpentry"],
      "experience": "1-2 years",
      "totalApplicants": 0,
      "status": "active",
      "company": {
        "_id": "507f1f77bcf86cd799439010",
        "name": "BuildPro Solutions",
        "logo": "https://..."
      }
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

### Get Job by ID
```json
GET /api/jobs/507f1f77bcf86cd799439012

Response: 200
{
  "job": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Construction Laborer",
    "description": "...",
    "category": "Construction",
    "salary": { ... },
    "jobType": "Daily Wage",
    "location": { ... },
    "skills": [ ... ],
    "experience": "1-2 years",
    "totalApplicants": 5,
    "status": "active",
    "company": {
      "_id": "507f1f77bcf86cd799439010",
      "name": "BuildPro Solutions"
    },
    "postedBy": {
      "_id": "507f1f77bcf86cd799439009",
      "name": "John Employer",
      "email": "john@buildpro.com",
      "phone": "+919876543220"
    }
  }
}
```

### Create Job
```json
POST /api/jobs
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "title": "Plumber",
  "description": "Experienced plumber needed for residential project",
  "company": "507f1f77bcf86cd799439010",
  "category": "Plumbing",
  "location": {
    "address": "789 Service Center",
    "lat": 19.0850,
    "lng": 72.8850,
    "city": "Mumbai",
    "state": "Maharashtra"
  },
  "salary": {
    "min": 600,
    "max": 1200,
    "currency": "INR",
    "period": "daily"
  },
  "jobType": "Part-time",
  "experience": "3+ years",
  "skills": ["Plumbing", "Pipe Fitting"]
}

Response: 201
{
  "message": "Job created successfully",
  "job": { ... }
}
```

### Apply to Job
```json
POST /api/jobs/507f1f77bcf86cd799439012/apply
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Response: 201
{
  "message": "Application submitted successfully",
  "application": {
    "_id": "507f1f77bcf86cd799439020",
    "jobId": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "employerId": "507f1f77bcf86cd799439009",
    "status": "applied",
    "appliedVia": "direct",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

## Applications APIs

### Get My Applications
```json
GET /api/applications/my
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Response: 200
{
  "applications": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "jobId": {
        "_id": "507f1f77bcf86cd799439012",
        "title": "Construction Laborer",
        "salary": { ... }
      },
      "status": "applied",
      "appliedVia": "direct",
      "employerId": {
        "_id": "507f1f77bcf86cd799439009",
        "name": "BuildPro Solutions",
        "email": "buildpro@company.com"
      },
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### Update Application Status
```json
PATCH /api/applications/507f1f77bcf86cd799439020
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "status": "shortlisted"
}

Response: 200
{
  "message": "Application status updated",
  "application": {
    "_id": "507f1f77bcf86cd799439020",
    "status": "shortlisted",
    ...
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Email already registered"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid token"
}
```

### 403 Forbidden
```json
{
  "message": "Forbidden"
}
```

### 404 Not Found
```json
{
  "message": "Job not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```
