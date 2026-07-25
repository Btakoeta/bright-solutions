# Bright Solutions - Project Structure

## Complete Directory Tree

```
bright-solutions/
│
├── frontend/                          # React Frontend Application
│   ├── src/
│   │   ├── pages/                     # Page Components
│   │   │   ├── Landing.tsx            # Public landing page
│   │   │   ├── Login.tsx              # Login page
│   │   │   ├── Register.tsx           # Registration page
│   │   │   ├── Dashboard.tsx          # Main dashboard
│   │   │   ├── Subscriptions.tsx      # Service subscriptions management
│   │   │   ├── Tracking.tsx           # Real-time truck tracking
│   │   │   ├── WasteStats.tsx         # Waste analytics and statistics
│   │   │   └── Settings.tsx           # User account settings
│   │   │
│   │   ├── components/                # Reusable Components
│   │   │   ├── Navigation.tsx         # Sidebar navigation
│   │   │   ├── ProtectedRoute.tsx     # Protected route wrapper
│   │   │   └── [other components]
│   │   │
│   │   ├── store/                     # Zustand Store
│   │   │   └── authStore.ts           # Authentication state management
│   │   │
│   │   ├── services/                  # API Services
│   │   │   └── api.ts                 # Axios API client
│   │   │
│   │   ├── App.tsx                    # Main app component with routing
│   │   ├── main.tsx                   # React app entry point
│   │   └── index.css                  # Global styles with Tailwind
│   │
│   ├── index.html                     # HTML entry point
│   ├── vite.config.ts                 # Vite configuration
│   ├── tsconfig.json                  # TypeScript configuration
│   ├── tsconfig.node.json             # TypeScript node configuration
│   ├── tailwind.config.js             # Tailwind CSS configuration
│   ├── postcss.config.js              # PostCSS configuration
│   ├── package.json                   # Frontend dependencies
│   ├── Dockerfile                     # Docker image for frontend
│   └── nginx.conf                     # Nginx configuration for production
│
├── backend/                           # Express.js Backend Application
│   ├── src/
│   │   ├── routes/                    # API Route Handlers
│   │   │   ├── auth.ts                # Authentication endpoints
│   │   │   ├── users.ts               # User profile endpoints
│   │   │   ├── subscriptions.ts       # Service subscription endpoints
│   │   │   ├── trucks.ts              # Truck management endpoints
│   │   │   ├── waste.ts               # Waste tracking endpoints
│   │   │   └── notifications.ts       # Notification endpoints
│   │   │
│   │   ├── middleware/                # Express Middleware
│   │   │   └── auth.ts                # JWT authentication middleware
│   │   │
│   │   └── index.ts                   # Express server entry point
│   │
│   ├── prisma/                        # Database Schema & Migrations
│   │   ├── schema.prisma              # Prisma database schema
│   │   └── migrations/                # Database migrations
│   │
│   ├── tsconfig.json                  # TypeScript configuration
│   ├── package.json                   # Backend dependencies
│   ├── .env.example                   # Environment variables template
│   ├── Dockerfile                     # Docker image for backend
│   └── .gitignore                     # Git ignore rules
│
├── scripts/                           # Utility Scripts
│   └── init.sh                        # Project initialization script
│
├── Documentation Files
│   ├── README.md                      # Main project documentation
│   ├── SETUP.md                       # Local development setup guide
│   ├── DEPLOYMENT.md                  # Production deployment guide
│   ├── FEATURES.md                    # Feature documentation
│   ├── API.md                         # API reference documentation
│   └── PROJECT_STRUCTURE.md           # This file
│
├── Configuration Files
│   ├── package.json                   # Root package.json (workspace)
│   ├── docker-compose.yml             # Docker compose for full stack
│   ├── .gitignore                     # Git ignore rules
│   └── .dockerignore                  # Docker ignore rules
│
└── [Root Files]
    ├── LICENSE                        # MIT License
    └── .env.example                   # Example environment variables
```

---

## File Descriptions

### Frontend Key Files

#### src/App.tsx
- Main React component
- Sets up React Router
- Initializes authentication
- Defines all routes including protected routes

#### src/pages/
- **Landing.tsx**: Public homepage with feature overview
- **Login.tsx**: User login form
- **Register.tsx**: User registration form with role selection
- **Dashboard.tsx**: Main user dashboard with statistics
- **Subscriptions.tsx**: Manage waste collection services
- **Tracking.tsx**: Real-time garbage truck tracking
- **WasteStats.tsx**: Analytics and waste disposal charts
- **Settings.tsx**: User profile and account settings

#### src/store/authStore.ts
Zustand store managing:
- User authentication state
- Token storage and retrieval
- Login/register/logout functions
- Auth state persistence

#### src/services/api.ts
Axios configuration:
- Base URL configuration
- Request/response interceptors
- Auto-logout on 401 errors
- Authorization header management

### Backend Key Files

#### src/index.ts
- Express server initialization
- CORS configuration
- Route mounting
- WebSocket setup for real-time tracking
- Health check endpoint

#### src/routes/auth.ts
Authentication endpoints:
- POST /register - New account creation
- POST /login - User authentication
- POST /logout - Session termination

#### src/routes/users.ts
User management:
- GET /users/me - Current user profile
- PUT /users/me - Profile updates
- POST /users/organization - Create organization

#### src/routes/subscriptions.ts
Service subscriptions:
- POST - Create subscription
- GET - List user subscriptions
- PUT - Update subscription
- DELETE - Cancel subscription

#### src/routes/trucks.ts
Fleet management:
- POST - Add truck to fleet
- GET - List organization trucks
- POST /:id/location - Update GPS location
- GET /:id/locations - Location history
- PUT /:id/status - Update truck status

#### src/routes/waste.ts
Waste tracking:
- POST - Log waste disposal
- GET - Retrieve waste records
- GET /summary - Waste statistics

#### src/routes/notifications.ts
Notification management:
- GET - List user notifications
- PUT /:id/read - Mark as read
- PUT /read-all - Mark all as read

#### src/middleware/auth.ts
- JWT verification
- Token extraction from headers
- User ID injection into requests
- Token generation for new sessions

### Database

#### prisma/schema.prisma
Defines all data models:
- User - User accounts
- Organization - Company/institutional accounts
- Truck - Fleet vehicles
- TruckLocation - GPS location history
- ServiceSubscription - Service subscriptions
- ServiceCollection - Collection events
- WasteRecord - Waste disposal logs
- Notification - User notifications
- Route - Collection routes

---

## Technology Stack Details

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2 | UI framework |
| TypeScript | 5.2 | Type safety |
| Vite | 5.0 | Build tool |
| Tailwind CSS | 3.3 | Styling |
| React Router | 6.16 | Navigation |
| Zustand | 4.4 | State management |
| Axios | 1.5 | HTTP client |
| Recharts | 2.10 | Data visualization |
| Lucide React | 0.292 | Icons |
| React Leaflet | 4.2 | Map integration |

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime |
| Express | 4.18 | Web framework |
| TypeScript | 5.2 | Type safety |
| PostgreSQL | 12+ | Database |
| Prisma | 5.3 | ORM |
| JWT | 9.1 | Authentication |
| bcryptjs | 2.4 | Password hashing |
| WebSocket | 8.14 | Real-time updates |
| CORS | 2.8 | Cross-origin requests |

---

## Data Models

### User
```
- id (string, unique)
- email (string, unique)
- password (hashed string)
- firstName (string)
- lastName (string)
- userType (enum: INDIVIDUAL, ORGANIZATION, MUNICIPALITY, STATE, COMMUNITY)
- phone (string, optional)
- address (string, optional)
- city (string, optional)
- state (string, optional)
- zipCode (string, optional)
- latitude (float, optional)
- longitude (float, optional)
- timestamps (createdAt, updatedAt)
```

### Organization
```
- id (string, unique)
- userId (string, foreign key)
- name (string)
- organizationType (string)
- taxId (string, optional)
- serviceAreas (array of strings)
- timestamps (createdAt, updatedAt)
```

### Truck
```
- id (string, unique)
- organizationId (string, foreign key)
- licensePlate (string, unique)
- capacity (integer)
- truckType (enum: STANDARD, COMPACTOR, FLATBED, RECYCLING, HAZMAT)
- fuelType (string)
- currentLocation (string, optional)
- status (enum: IDLE, ACTIVE, IN_MAINTENANCE, OFF_DUTY)
- lastMaintenanceDate (datetime, optional)
- timestamps (createdAt, updatedAt)
```

### ServiceSubscription
```
- id (string, unique)
- userId (string, foreign key)
- organizationId (string, optional, foreign key)
- serviceType (enum: TRASH, RECYCLING, COMPOSTING, BULKY_ITEMS, HAZARDOUS_WASTE)
- frequency (enum: WEEKLY, BIWEEKLY, MONTHLY)
- containerSize (integer, gallons)
- price (float, monthly cost)
- status (enum: ACTIVE, PAUSED, CANCELLED)
- startDate (datetime)
- endDate (datetime, optional)
- timestamps (createdAt, updatedAt)
```

### WasteRecord
```
- id (string, unique)
- userId (string, optional, foreign key)
- organizationId (string, optional, foreign key)
- wasteType (enum: TRASH, RECYCLING, COMPOSTING, BULKY_ITEMS, HAZARDOUS_WASTE)
- weight (float, kg)
- volume (float, optional, cubic meters)
- date (datetime)
- notes (string, optional)
- timestamps (createdAt)
```

---

## API Routes Structure

```
/auth
  ├── POST   /register        - Create account
  ├── POST   /login           - User login
  └── POST   /logout          - User logout

/users
  ├── GET    /me              - Get profile
  ├── PUT    /me              - Update profile
  └── POST   /organization    - Create organization

/subscriptions
  ├── GET    /                - List subscriptions
  ├── GET    /:id             - Get single subscription
  ├── POST   /                - Create subscription
  ├── PUT    /:id             - Update subscription
  └── DELETE /:id             - Cancel subscription

/trucks
  ├── GET    /                - List trucks
  ├── POST   /                - Create truck
  ├── POST   /:id/location    - Update location
  ├── GET    /:id/locations   - Get location history
  └── PUT    /:id/status      - Update truck status

/waste
  ├── GET    /                - List waste records
  ├── GET    /summary         - Get statistics
  └── POST   /                - Log waste

/notifications
  ├── GET    /                - List notifications
  ├── PUT    /:id/read        - Mark as read
  └── PUT    /read-all        - Mark all as read
```

---

## Component Hierarchy

```
App
├── Landing
├── Login
├── Register
└── ProtectedRoute (for authenticated pages)
    ├── Navigation
    ├── Dashboard
    ├── Subscriptions
    ├── Tracking
    ├── WasteStats
    └── Settings
```

---

## State Management Flow

```
User Action (e.g., click login button)
    ↓
Component Event Handler
    ↓
API Call via axios
    ↓
Backend Processing
    ↓
Response Handling
    ↓
Zustand Store Update
    ↓
Component Re-render with new state
```

---

## Authentication Flow

```
1. User fills registration form
   ↓
2. POST /auth/register with credentials
   ↓
3. Backend validates and hashes password
   ↓
4. User created in database
   ↓
5. JWT token generated
   ↓
6. Token sent to frontend
   ↓
7. Frontend stores in localStorage
   ↓
8. Token added to Authorization header for all requests
   ↓
9. Backend middleware verifies token
   ↓
10. Request processed or rejected
```

---

## Database Connection Flow

```
Backend
    ↓
Prisma Client (ORM)
    ↓
PostgreSQL Driver
    ↓
PostgreSQL Database
    ↓
Response returned through layers
```

---

## Development Workflow

### 1. Local Development
```
npm install-all      # Install all dependencies
npm run dev          # Start both frontend and backend
```

### 2. Making Changes
- Frontend: Edit files in `frontend/src/`
- Backend: Edit files in `backend/src/`
- Database: Update `backend/prisma/schema.prisma`

### 3. Database Changes
```
npx prisma migrate dev          # Create migration
npx prisma migrate deploy       # Deploy to existing DB
npx prisma studio              # View data visually
```

### 4. Building for Production
```
npm run build                   # Build both projects
```

---

## Adding a New Feature

### Example: Adding a new service type

1. **Update Database Schema** (`backend/prisma/schema.prisma`)
   - Add new enum value to `ServiceType`
   - Run: `npx prisma migrate dev --name add_service_type`

2. **Create/Update API Endpoint** (`backend/src/routes/subscriptions.ts`)
   - No changes needed (already handles all types)

3. **Update Frontend** (`frontend/src/pages/Subscriptions.tsx`)
   - Add option to service type select dropdown

4. **Test**
   - Start dev server: `npm run dev`
   - Create subscription with new type
   - Verify in database: `npx prisma studio`

---

## Debugging Tips

### Frontend Debug
- React DevTools browser extension
- Console.log and network tab
- Zustand store inspection
- localStorage check for token

### Backend Debug
- Server logs in terminal
- Prisma Studio for database
- Postman/cURL for API testing
- TypeScript errors caught at compile time

### Database Debug
```bash
# Open Prisma Studio
cd backend
npx prisma studio

# View raw logs
npm run dev -- --verbose
```

---

## Performance Optimization Points

1. **Frontend**
   - Code splitting with React.lazy()
   - Image optimization with WebP
   - CSS minimization with Tailwind
   - Bundle analysis with Vite

2. **Backend**
   - Database indexing on frequently queried fields
   - Query optimization with Prisma select
   - Caching with Redis (future)
   - Rate limiting to prevent abuse

3. **Database**
   - Proper indexing on foreign keys
   - Connection pooling
   - Regular maintenance

---

## Security Considerations

### Frontend
- HTTPS enforced in production
- XSS protection with React auto-escaping
- CSRF protection via JWT
- Secure token storage

### Backend
- JWT validation on all protected routes
- Password hashing with bcrypt
- CORS whitelisting
- Input validation and sanitization
- SQL injection prevention via Prisma ORM

### Database
- User authentication required
- Regular backups
- Encryption at rest
- Access control lists

---

## Maintenance & Support

- Monitor application logs
- Regular database backups
- Security updates for dependencies
- Performance monitoring
- User support ticketing system (future)

---

## Version Control

### Branch Strategy
- `main` - Production ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
- `hotfix/*` - Production hotfixes

### Commit Messages
```
feat: Add new waste type
fix: Fix truck location update
docs: Update API documentation
refactor: Simplify authentication logic
test: Add API tests
```

---

## Dependencies Management

### Update Dependencies
```bash
# Check for updates
npm outdated

# Update specific package
npm update package-name

# Update all
npm update
```

### Security Audit
```bash
npm audit
npm audit fix
```

---

## Further Reading

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express Documentation](https://expressjs.com)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

Last Updated: 2024
