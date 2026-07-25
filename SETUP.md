# Bright Solutions - Setup Guide

## Quick Start (Development)

### 1. Prerequisites
- Node.js 16+ ([Install Node.js](https://nodejs.org/))
- PostgreSQL 12+ ([Install PostgreSQL](https://www.postgresql.org/download/))
- Git

### 2. Clone and Install

```bash
cd bright-solutions

# Install all dependencies
npm run install-all
```

### 3. Database Setup

#### On macOS (using Homebrew):
```bash
# Install PostgreSQL
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb bright_solutions

# Create user (optional, you can use default postgres user)
createuser -P bright_user  # Set password to: bright_password
```

#### On Linux (Ubuntu/Debian):
```bash
sudo apt-get install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb bright_solutions

# Create user
sudo -u postgres createuser bright_user
sudo -u postgres psql -c "ALTER USER bright_user WITH PASSWORD 'bright_password';"
```

#### On Windows:
1. Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Remember the superuser password you set during installation
3. Use pgAdmin or command line to create the database

### 4. Environment Configuration

**Backend Setup:**
```bash
cd backend

# Copy environment template
cp .env.example .env

# Edit .env file with your database connection
# Database URL format: postgresql://username:password@localhost:5432/bright_solutions
# Example: postgresql://postgres:password@localhost:5432/bright_solutions
```

### 5. Initialize Database

```bash
cd backend

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Open Prisma Studio to view database
npx prisma studio
```

### 6. Start Development Server

```bash
# From project root
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Usage

### Create an Account

1. Go to http://localhost:5173
2. Click "Sign Up"
3. Choose your account type (Individual, Organization, Municipality, etc.)
4. Fill in your details and create account
5. You'll be logged in automatically

### Add a Service Subscription

1. Go to "Services" page
2. Click "Add Service"
3. Select service type (Trash, Recycling, etc.)
4. Set frequency and container size
5. Click "Create Subscription"

### Track Waste

1. Go to "Waste Stats" page
2. Click "Log Waste"
3. Enter waste type, weight, and volume
4. Click "Log Waste"
5. View your analytics and charts

### View Real-Time Tracking

1. Go to "Truck Tracking" page
2. When trucks are active, select one from the list
3. See real-time location and status

## Docker Deployment

### Start with Docker Compose

```bash
# Make sure you're in the project root directory
docker-compose up -d

# Check if containers are running
docker-compose ps

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Database Management

### View Data in Prisma Studio
```bash
cd backend
npx prisma studio
```

### Backup Database (PostgreSQL)
```bash
pg_dump bright_solutions > backup.sql
```

### Restore Database (PostgreSQL)
```bash
psql bright_solutions < backup.sql
```

### Reset Database (Development Only)
```bash
cd backend
npx prisma migrate reset
```

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or change port in backend/.env
PORT=3001
```

### Database Connection Error
- Check PostgreSQL is running: `psql --version`
- Verify DATABASE_URL in backend/.env
- Check credentials: username and password match

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm run install-all
```

### Prisma Client Issues
```bash
cd backend
npx prisma generate
npx prisma migrate deploy
```

## Production Deployment

### Environment Variables Required
```bash
DATABASE_URL=postgresql://user:password@host:5432/db_name
JWT_SECRET=your-long-random-secret-key
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Using Vercel (Frontend)
1. Push to GitHub
2. Go to vercel.com
3. Import project
4. Add environment variable: `VITE_API_URL=your-api-url`
5. Deploy

### Using Render, Railway, or Heroku (Backend)
1. Create account on chosen platform
2. Connect GitHub repository
3. Set environment variables
4. Deploy

## Support

For issues:
1. Check the README.md
2. Review logs: `docker-compose logs`
3. Check database: `npx prisma studio`
4. Open an issue on GitHub

## Next Steps

- [ ] Customize branding and colors
- [ ] Set up email notifications
- [ ] Configure payment processing
- [ ] Add more waste types
- [ ] Set up monitoring and alerts
- [ ] Configure backups
