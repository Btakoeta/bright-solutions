# Bright Solutions - Quick Start Guide

Welcome to **Bright Solutions** - the modern waste management platform for municipalities, organizations, communities, and individuals.

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js 16+ ([Download](https://nodejs.org/))
- PostgreSQL 12+ ([Download](https://www.postgresql.org/download/))

### Step 1: Clone & Install
```bash
cd bright-solutions
npm run install-all
```

### Step 2: Setup Database
```bash
# Copy environment template
cp backend/.env.example backend/.env

# Update DATABASE_URL in backend/.env
# Default: postgresql://postgres:password@localhost:5432/bright_solutions
```

### Step 3: Initialize Database
```bash
cd backend
npx prisma migrate dev
cd ..
```

### Step 4: Start Development
```bash
npm run dev
```

Open your browser:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

---

## 📝 First Steps

### Create an Account

1. Go to http://localhost:5173
2. Click **"Sign Up"**
3. Choose your account type:
   - **Individual** - Personal waste management
   - **Organization** - Business waste management
   - **Community** - Local coordination
   - **Municipality** - City/county management
   - **State** - Statewide oversight
4. Fill in your details
5. Click **"Create Account"**

### Add a Service

1. From dashboard, click **"Services"**
2. Click **"Add Service"**
3. Select service type (Trash, Recycling, Composting, etc.)
4. Choose frequency (Weekly, Bi-weekly, Monthly)
5. Set container size and price
6. Click **"Create Subscription"**

### Track Your Waste

1. Click **"Waste Stats"**
2. Click **"Log Waste"**
3. Enter waste type and weight
4. View your analytics and charts

### Monitor Collections

1. Click **"Truck Tracking"**
2. Select a truck from the list
3. See real-time location and status
4. View collection history

---

## 🏗️ Project Structure

```
bright-solutions/
├── frontend/          # React web application
├── backend/           # Express API server
├── scripts/           # Utility scripts
└── Documentation      # Setup guides and API docs
```

### Key Directories

**Frontend** (`frontend/src/`):
- `pages/` - Page components (Dashboard, Tracking, etc.)
- `components/` - Reusable UI components
- `store/` - State management
- `services/` - API client

**Backend** (`backend/src/`):
- `routes/` - API endpoints
- `middleware/` - Authentication
- `prisma/` - Database schema

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [README.md](README.md) | Project overview and features |
| [SETUP.md](SETUP.md) | Detailed setup instructions |
| [FEATURES.md](FEATURES.md) | Feature documentation |
| [API.md](API.md) | Complete API reference |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Production deployment guide |
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | Codebase architecture |

---

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Initialize database
cd backend && npx prisma migrate dev

# Open database GUI
cd backend && npx prisma studio

# Initialize project (first time setup)
npm run init
```

---

## 🔧 Configuration

### Backend Environment Variables

Create `backend/.env`:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/bright_solutions"

# Security
JWT_SECRET="your-long-random-secret-key"

# Server
PORT=3000
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
```

### Frontend Environment Variables

Create `frontend/.env`:
```env
VITE_API_URL="http://localhost:3000"
```

---

## 🔐 Authentication

### Registration
```javascript
POST /auth/register
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "userType": "INDIVIDUAL"
}
```

### Login
```javascript
POST /auth/login
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

Response includes JWT token valid for 30 days.

---

## 📊 Core Features

### For Individuals
✅ Sign up for waste collection
✅ Track collection schedules
✅ Log waste disposal
✅ View waste statistics
✅ Receive notifications

### For Organizations
✅ Manage fleet of trucks
✅ Track waste costs
✅ Real-time GPS tracking
✅ Waste analytics
✅ Employee management

### For Municipalities
✅ Oversee collection routes
✅ Monitor service providers
✅ Track compliance
✅ View city-wide statistics
✅ Generate reports

---

## 🗄️ Database

### Main Tables
- `User` - User accounts
- `Organization` - Company accounts
- `Truck` - Fleet vehicles
- `ServiceSubscription` - Service subscriptions
- `WasteRecord` - Waste disposal logs
- `TruckLocation` - GPS tracking
- `Notification` - User notifications

### View Database
```bash
cd backend
npx prisma studio
```

---

## 🌐 API Endpoints

### Authentication
- `POST /auth/register` - Create account
- `POST /auth/login` - User login
- `POST /auth/logout` - Logout

### Users
- `GET /users/me` - Get profile
- `PUT /users/me` - Update profile

### Subscriptions
- `GET /subscriptions` - List subscriptions
- `POST /subscriptions` - Create subscription
- `PUT /subscriptions/:id` - Update subscription
- `DELETE /subscriptions/:id` - Cancel subscription

### Waste
- `GET /waste` - Get records
- `GET /waste/summary` - Get statistics
- `POST /waste` - Log waste

### Trucks
- `GET /trucks` - List trucks
- `POST /trucks/:id/location` - Update location

See [API.md](API.md) for complete reference.

---

## 🚀 Deployment

### Docker (Recommended)
```bash
docker-compose up -d
```

### Vercel + Railway
See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step instructions.

### Traditional Server
See [DEPLOYMENT.md](DEPLOYMENT.md) for manual setup.

---

## 🧪 Testing

### Test Account
```
Email: test@example.com
Password: testpass123
Type: INDIVIDUAL
```

### Create Test Data
1. Register account
2. Add service subscription
3. Log waste disposal
4. View analytics

---

## ❓ Troubleshooting

### Can't connect to database?
```bash
# Check PostgreSQL is running
psql --version

# Check connection string in backend/.env
# Format: postgresql://user:password@localhost:5432/dbname
```

### Port already in use?
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or change port in backend/.env
PORT=3001
```

### Dependencies error?
```bash
# Reinstall everything
rm -rf node_modules
npm run install-all
```

### WebSocket connection issue?
- Check backend is running on port 3000
- Check FRONTEND_URL in backend/.env
- Check network/firewall settings

---

## 📖 Learn More

### Technologies Used
- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens
- **Real-time**: WebSockets

### Resources
- [React Documentation](https://react.dev)
- [Express Guide](https://expressjs.com)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Prisma ORM](https://www.prisma.io)

---

## 🤝 Contributing

To add features:
1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for architecture details.

---

## 📞 Support

### Getting Help
1. Check documentation files
2. Review API reference
3. Check database with Prisma Studio
4. Review application logs
5. Check backend console output

### Common Issues
- **Login fails**: Check email/password, database connection
- **Subscriptions don't show**: Refresh page, check database
- **Truck tracking not working**: Check WebSocket connection
- **Database errors**: Run `npx prisma migrate deploy`

---

## ✅ Next Steps

- [ ] Complete setup (SETUP.md)
- [ ] Create test account
- [ ] Add service subscription
- [ ] Log waste data
- [ ] Explore analytics
- [ ] Deploy to production (DEPLOYMENT.md)
- [ ] Customize branding
- [ ] Set up notifications (future)
- [ ] Configure backups
- [ ] Monitor performance

---

## 📋 Project Checklist

### Development
- [x] Frontend application
- [x] Backend API
- [x] Database schema
- [x] Authentication system
- [x] Real-time tracking
- [x] Analytics dashboard

### Documentation
- [x] README
- [x] Setup guide
- [x] Feature documentation
- [x] API reference
- [x] Deployment guide
- [x] Project structure
- [x] Getting started

### Deployment Ready
- [x] Docker support
- [x] Environment configuration
- [x] Database migrations
- [x] SSL/TLS ready
- [x] CORS configured
- [x] Error handling

---

## 🎉 Welcome!

You now have a complete, production-ready waste management platform. Start with the [SETUP.md](SETUP.md) guide for detailed instructions.

**Happy coding!**

---

Last Updated: January 2024
Version: 1.0.0
