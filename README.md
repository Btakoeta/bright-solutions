# Bright Solutions - Waste Management Platform

A modern, full-featured waste management platform that enables municipalities, organizations, communities, and individuals to manage waste collection, track garbage trucks in real-time, and aggregate waste disposal data.

## Features

### 🌍 For Everyone
- **Individuals**: Manage household waste, track collection schedules, view disposal history
- **Organizations**: Optimize business waste management, reduce disposal costs, track sustainability metrics
- **Communities**: Coordinate municipal waste collection, monitor programs
- **States & Municipalities**: Oversee waste trends across regions, improve public services

### 🔋 Core Features
- ✅ **User Authentication**: Secure registration and login with role-based access
- ✅ **Real-time Truck Tracking**: GPS tracking of garbage collection trucks
- ✅ **Service Subscriptions**: Sign up for trash, recycling, composting, and hazardous waste collection
- ✅ **Waste Analytics**: Comprehensive insights into waste disposal patterns
- ✅ **Waste Aggregation**: Track total weight and volume of waste disposed
- ✅ **Account Management**: Profile settings, address management
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

### Frontend
- **React** 18 - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Zustand** - State management
- **Recharts** - Data visualization
- **Axios** - API communication
- **Lucide React** - Icons
- **Vite** - Build tool

### Backend
- **Node.js & Express** - Server framework
- **TypeScript** - Type safety
- **PostgreSQL** - Database
- **Prisma** - ORM
- **JWT** - Authentication
- **WebSockets** - Real-time updates
- **bcryptjs** - Password hashing

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- PostgreSQL 12+
- Git

### Installation

1. Clone the repository
```bash
cd bright-solutions
```

2. Install dependencies
```bash
npm run install-all
```

3. Set up environment variables

**Backend (.env)**
```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your database URL and JWT secret
DATABASE_URL="postgresql://user:password@localhost:5432/bright_solutions"
JWT_SECRET="your-secret-key-here"
PORT=3000
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
```

4. Set up the database
```bash
cd backend
npx prisma migrate dev
npx prisma generate
cd ..
```

5. Start the development server
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Project Structure

```
bright-solutions/
├── frontend/                 # React application
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable components
│   │   ├── store/           # Zustand stores
│   │   ├── services/        # API services
│   │   ├── App.tsx          # Main app component
│   │   └── index.css        # Global styles
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                  # Express API
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Authentication, etc.
│   │   └── index.ts         # Server entry point
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   ├── .env.example
│   └── package.json
│
└── package.json             # Root package.json
```

## User Roles

### Individual
- Personal waste disposal tracking
- Service subscription management
- View upcoming collection dates
- Track disposal history and statistics

### Organization
- Manage business waste collection
- Multiple location management
- Waste reporting and compliance
- Cost tracking and optimization

### Community
- Coordinate local waste management
- View community-wide statistics
- Manage community programs
- Resident engagement tools

### Municipality
- Regional waste oversight
- Public service management
- Waste trend analysis
- Policy implementation tracking

### State
- Statewide waste data aggregation
- Regulatory compliance monitoring
- Regional benchmarking
- Environmental impact tracking

## API Endpoints

### Authentication
- `POST /auth/register` - Create new account
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### Users
- `GET /users/me` - Get current user profile
- `PUT /users/me` - Update profile
- `POST /users/organization` - Create organization

### Subscriptions
- `GET /subscriptions` - List user subscriptions
- `POST /subscriptions` - Create subscription
- `PUT /subscriptions/:id` - Update subscription
- `DELETE /subscriptions/:id` - Cancel subscription

### Trucks
- `GET /trucks` - List trucks (for organization)
- `POST /trucks` - Create truck
- `POST /trucks/:id/location` - Update truck location
- `GET /trucks/:id/locations` - Get location history
- `PUT /trucks/:id/status` - Update truck status

### Waste
- `POST /waste` - Log waste disposal
- `GET /waste` - Get waste records
- `GET /waste/summary` - Get waste statistics

### Notifications
- `GET /notifications` - Get user notifications
- `PUT /notifications/:id/read` - Mark as read

## Database Schema

### Users
- Stores user account information
- Supports multiple user types
- Geographic location tracking

### Organizations
- Company/organizational accounts
- Service areas management
- Truck fleet management

### Trucks
- Fleet management
- Real-time location tracking
- Status and maintenance tracking

### Service Subscriptions
- Service type and frequency
- Container size and pricing
- Collection history

### Waste Records
- Waste type and weight tracking
- Volume measurement
- Historical data for analytics

## Deployment

### Docker Deployment
```bash
docker-compose up -d
```

### Hosting Options
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Heroku, Railway, Render, AWS, DigitalOcean
- **Database**: AWS RDS, DigitalOcean Managed DB, Supabase

## Development

### Running Tests
```bash
# Frontend
cd frontend
npm run test

# Backend
cd backend
npm run test
```

### Database Management
```bash
# View database
cd backend
npx prisma studio

# Create migration
npx prisma migrate dev --name migration_name

# Reset database (development only)
npx prisma migrate reset
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## Security Considerations

- JWT tokens expire after 30 days
- Passwords are hashed with bcrypt
- CORS is configured for specified origins
- Environment variables store sensitive data
- SQL injection prevention via Prisma ORM

## License

MIT License - See LICENSE file for details

## Support

For issues, questions, or suggestions, please open an issue on the repository.

## Roadmap

- [ ] Email notifications
- [ ] Advanced reporting features
- [ ] Mobile app
- [ ] Integration with third-party waste management providers
- [ ] AI-powered route optimization
- [ ] Carbon footprint tracking
- [ ] Community leaderboards
- [ ] Payment processing
