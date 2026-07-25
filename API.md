# Bright Solutions - API Reference

## Base URL

```
http://localhost:3000  (Development)
https://api.yourdomain.com  (Production)
```

## Authentication

All endpoints (except `/auth/*`) require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

Tokens are obtained from the login/register endpoints and are valid for 30 days.

---

## Authentication Endpoints

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "userType": "INDIVIDUAL",
  "phone": "123-456-7890",
  "address": "123 Main St",
  "city": "Springfield",
  "state": "IL",
  "zipCode": "62701"
}
```

**Response (201)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "userType": "INDIVIDUAL"
  }
}
```

---

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "userType": "INDIVIDUAL"
  }
}
```

---

### Logout
```http
POST /auth/logout
Authorization: Bearer <token>
```

**Response (200)**:
```json
{
  "message": "Logged out successfully"
}
```

---

## User Endpoints

### Get Current User Profile
```http
GET /users/me
Authorization: Bearer <token>
```

**Response (200)**:
```json
{
  "id": "user_123",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "userType": "INDIVIDUAL",
  "phone": "123-456-7890",
  "address": "123 Main St",
  "city": "Springfield",
  "state": "IL",
  "zipCode": "62701",
  "latitude": 39.7817,
  "longitude": -89.6501,
  "organization": null
}
```

---

### Update User Profile
```http
PUT /users/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "phone": "987-654-3210",
  "address": "456 Oak Ave",
  "city": "Chicago",
  "state": "IL",
  "zipCode": "60611",
  "latitude": 41.8781,
  "longitude": -87.6298
}
```

**Response (200)**:
```json
{
  "id": "user_123",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Smith",
  "userType": "INDIVIDUAL"
}
```

---

### Create Organization
```http
POST /users/organization
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "ABC Waste Services",
  "organizationType": "WASTE_MANAGEMENT",
  "taxId": "12-3456789",
  "serviceAreas": ["IL", "IN", "WI"]
}
```

**Response (201)**:
```json
{
  "id": "org_456",
  "name": "ABC Waste Services",
  "userId": "user_123",
  "organizationType": "WASTE_MANAGEMENT",
  "taxId": "12-3456789",
  "serviceAreas": ["IL", "IN", "WI"]
}
```

---

## Subscription Endpoints

### Create Subscription
```http
POST /subscriptions
Authorization: Bearer <token>
Content-Type: application/json

{
  "serviceType": "TRASH",
  "frequency": "WEEKLY",
  "containerSize": 64,
  "price": 25.00,
  "organizationId": null
}
```

**Response (201)**:
```json
{
  "id": "sub_789",
  "userId": "user_123",
  "serviceType": "TRASH",
  "frequency": "WEEKLY",
  "containerSize": 64,
  "status": "ACTIVE",
  "price": 25.00,
  "startDate": "2024-01-15T10:00:00Z",
  "endDate": null,
  "collections": []
}
```

---

### List Subscriptions
```http
GET /subscriptions
Authorization: Bearer <token>
```

**Response (200)**:
```json
[
  {
    "id": "sub_789",
    "userId": "user_123",
    "serviceType": "TRASH",
    "frequency": "WEEKLY",
    "containerSize": 64,
    "status": "ACTIVE",
    "price": 25.00,
    "startDate": "2024-01-15T10:00:00Z",
    "collections": [
      {
        "id": "col_001",
        "collectedAt": "2024-01-22T09:30:00Z",
        "weight": 45.5,
        "status": "COMPLETED"
      }
    ]
  }
]
```

---

### Get Single Subscription
```http
GET /subscriptions/:id
Authorization: Bearer <token>
```

**Response (200)**:
```json
{
  "id": "sub_789",
  "userId": "user_123",
  "serviceType": "TRASH",
  "frequency": "WEEKLY",
  "containerSize": 64,
  "status": "ACTIVE",
  "price": 25.00,
  "collections": [...]
}
```

---

### Update Subscription
```http
PUT /subscriptions/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "PAUSED",
  "frequency": "BIWEEKLY",
  "containerSize": 96
}
```

**Response (200)**:
```json
{
  "success": true,
  "modified": 1
}
```

---

### Delete Subscription
```http
DELETE /subscriptions/:id
Authorization: Bearer <token>
```

**Response (200)**:
```json
{
  "success": true
}
```

---

## Truck Endpoints

### Create Truck
```http
POST /trucks
Authorization: Bearer <token>
Content-Type: application/json

{
  "licensePlate": "ABC123",
  "capacity": 5000,
  "truckType": "COMPACTOR",
  "fuelType": "Diesel",
  "organizationId": "org_456"
}
```

**Response (201)**:
```json
{
  "id": "truck_001",
  "organizationId": "org_456",
  "licensePlate": "ABC123",
  "capacity": 5000,
  "truckType": "COMPACTOR",
  "fuelType": "Diesel",
  "status": "IDLE",
  "currentLocation": null,
  "lastMaintenanceDate": null
}
```

---

### List Trucks
```http
GET /trucks
Authorization: Bearer <token>
```

**Response (200)**:
```json
[
  {
    "id": "truck_001",
    "licensePlate": "ABC123",
    "capacity": 5000,
    "truckType": "COMPACTOR",
    "status": "ACTIVE",
    "locations": [
      {
        "id": "loc_001",
        "latitude": 39.7817,
        "longitude": -89.6501,
        "timestamp": "2024-01-22T09:30:00Z",
        "speed": 45.2,
        "heading": 180
      }
    ]
  }
]
```

---

### Update Truck Location
```http
POST /trucks/:id/location
Authorization: Bearer <token>
Content-Type: application/json

{
  "latitude": 39.7817,
  "longitude": -89.6501,
  "speed": 45.2,
  "heading": 180
}
```

**Response (201)**:
```json
{
  "id": "loc_001",
  "truckId": "truck_001",
  "driverId": "user_123",
  "latitude": 39.7817,
  "longitude": -89.6501,
  "timestamp": "2024-01-22T09:30:00Z",
  "speed": 45.2,
  "heading": 180
}
```

---

### Get Truck Locations
```http
GET /trucks/:id/locations
Authorization: Bearer <token>
```

**Response (200)**:
```json
[
  {
    "id": "loc_001",
    "latitude": 39.7817,
    "longitude": -89.6501,
    "timestamp": "2024-01-22T09:30:00Z",
    "speed": 45.2,
    "heading": 180
  }
]
```

---

### Update Truck Status
```http
PUT /trucks/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "ACTIVE"
}
```

**Response (200)**:
```json
{
  "id": "truck_001",
  "licensePlate": "ABC123",
  "status": "ACTIVE"
}
```

---

## Waste Endpoints

### Log Waste Disposal
```http
POST /waste
Authorization: Bearer <token>
Content-Type: application/json

{
  "wasteType": "TRASH",
  "weight": 45.5,
  "volume": 2.3,
  "notes": "Regular household garbage"
}
```

**Response (201)**:
```json
{
  "id": "waste_001",
  "userId": "user_123",
  "organizationId": null,
  "wasteType": "TRASH",
  "weight": 45.5,
  "volume": 2.3,
  "date": "2024-01-22T10:00:00Z",
  "notes": "Regular household garbage"
}
```

---

### Get Waste Records
```http
GET /waste
Authorization: Bearer <token>
```

**Response (200)**:
```json
[
  {
    "id": "waste_001",
    "wasteType": "TRASH",
    "weight": 45.5,
    "volume": 2.3,
    "date": "2024-01-22T10:00:00Z"
  }
]
```

---

### Get Waste Summary
```http
GET /waste/summary
Authorization: Bearer <token>
```

**Response (200)**:
```json
{
  "totalWeight": 1250.75,
  "totalVolume": 45.3,
  "recordCount": 28,
  "byType": {
    "TRASH": {
      "count": 15,
      "weight": 750.0,
      "volume": 25.0
    },
    "RECYCLING": {
      "count": 8,
      "weight": 350.5,
      "volume": 15.5
    },
    "COMPOSTING": {
      "count": 5,
      "weight": 150.25,
      "volume": 4.8
    }
  }
}
```

---

## Notification Endpoints

### Get Notifications
```http
GET /notifications
Authorization: Bearer <token>
```

**Response (200)**:
```json
[
  {
    "id": "notif_001",
    "userId": "user_123",
    "title": "Collection Scheduled",
    "message": "Your trash collection is scheduled for tomorrow at 8:00 AM",
    "type": "COLLECTION_SCHEDULED",
    "read": false,
    "createdAt": "2024-01-22T15:00:00Z"
  }
]
```

---

### Mark Notification as Read
```http
PUT /notifications/:id/read
Authorization: Bearer <token>
```

**Response (200)**:
```json
{
  "success": true
}
```

---

### Mark All Notifications as Read
```http
PUT /notifications/read-all
Authorization: Bearer <token>
```

**Response (200)**:
```json
{
  "success": true
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request parameters"
}
```

### 401 Unauthorized
```json
{
  "error": "No token provided"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Service Type Enum

```
TRASH
RECYCLING
COMPOSTING
BULKY_ITEMS
HAZARDOUS_WASTE
```

---

## Frequency Enum

```
WEEKLY
BIWEEKLY
MONTHLY
```

---

## Truck Type Enum

```
STANDARD
COMPACTOR
FLATBED
RECYCLING
HAZMAT
```

---

## Truck Status Enum

```
IDLE
ACTIVE
IN_MAINTENANCE
OFF_DUTY
```

---

## User Type Enum

```
INDIVIDUAL
ORGANIZATION
MUNICIPALITY
STATE
COMMUNITY
```

---

## Collection Status Enum

```
SCHEDULED
IN_PROGRESS
COMPLETED
MISSED
RESCHEDULED
```

---

## WebSocket Events (Real-Time Tracking)

### Connect
```javascript
const ws = new WebSocket('ws://localhost:3000');
```

### Send Truck Location
```javascript
ws.send(JSON.stringify({
  type: 'truck-location',
  truckId: 'truck_001',
  latitude: 39.7817,
  longitude: -89.6501,
  speed: 45.2,
  timestamp: new Date().toISOString()
}));
```

### Receive Truck Location
```javascript
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'truck-location') {
    // Update map with new location
    console.log(`Truck ${data.truckId} at ${data.latitude}, ${data.longitude}`);
  }
};
```

---

## Rate Limiting

- Default: 100 requests per 15 minutes
- Header: `X-RateLimit-Remaining`

---

## CORS Configuration

Allowed origins (configurable):
- `http://localhost:5173` (development)
- `https://yourdomain.com` (production)

---

## API Examples

### Complete Flow: Individual User

```javascript
// 1. Register
const registerResponse = await fetch('http://localhost:3000/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'securePassword123',
    firstName: 'John',
    lastName: 'Doe',
    userType: 'INDIVIDUAL'
  })
});
const { token } = await registerResponse.json();

// 2. Get profile
const profileResponse = await fetch('http://localhost:3000/users/me', {
  headers: { 'Authorization': `Bearer ${token}` }
});
const profile = await profileResponse.json();

// 3. Subscribe to service
const subResponse = await fetch('http://localhost:3000/subscriptions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    serviceType: 'TRASH',
    frequency: 'WEEKLY',
    containerSize: 64,
    price: 25.00
  })
});
const subscription = await subResponse.json();

// 4. Log waste
const wasteResponse = await fetch('http://localhost:3000/waste', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    wasteType: 'TRASH',
    weight: 45.5,
    volume: 2.3
  })
});

// 5. Get analytics
const statsResponse = await fetch('http://localhost:3000/waste/summary', {
  headers: { 'Authorization': `Bearer ${token}` }
});
const stats = await statsResponse.json();
```

---

## Testing

### Using cURL

```bash
# Register
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123",
    "firstName": "Test",
    "lastName": "User",
    "userType": "INDIVIDUAL"
  }'

# Get profile (replace TOKEN with actual token)
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:3000/users/me
```

### Using Postman

1. Create collection: "Bright Solutions API"
2. Create environment variable: `token`
3. Import endpoints from this documentation
4. Tests will automatically save token from login

---

## Documentation Version

- API Version: 1.0
- Last Updated: 2024
- Status: Stable
