# Vercel Deployment Guide

## Prerequisites
1. Install Vercel CLI: `npm i -g vercel`
2. Have a PostgreSQL database (local or cloud-based)
3. Ensure your database is accessible from Vercel's servers

## Deployment Steps

### 1. Environment Variables Setup
In your Vercel dashboard, add these environment variables:

**Option A: Individual Database Variables**
```
DB_USER=your_db_user
DB_HOST=your_db_host
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432
NODE_ENV=production
VERCEL=true
```

**Option B: Database URL (Recommended for cloud databases)**
```
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=production
VERCEL=true
```

### 2. Deploy to Vercel
```bash
# Navigate to the server/api directory
cd server/api

# Deploy to Vercel
vercel

# Follow the prompts:
# - Link to existing project or create new
# - Set project name
# - Confirm deployment settings
```

### 3. Production Deployment
```bash
# Deploy to production
vercel --prod
```

## API Endpoints
After deployment, your API will be available at:
- `https://your-project.vercel.app/api/blogs`
- `https://your-project.vercel.app/api/users`

## Important Notes
1. **Database**: Ensure your PostgreSQL database is accessible from Vercel's servers
2. **SSL**: For cloud databases, SSL is automatically configured
3. **Cold Starts**: Vercel uses serverless functions, so there might be cold start delays
4. **Environment Variables**: All sensitive data should be set in Vercel dashboard, not in code

## Troubleshooting
- Check Vercel function logs for database connection issues
- Ensure all environment variables are properly set
- Verify database accessibility from external IPs 