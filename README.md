# 🌍 LocationTrack

**Real-time Location Tracking Application with Admin Dashboard**

LocationTrack is a modern, full-stack web application that provides real-time location tracking capabilities with role-based access control. Built with React and Node.js, it offers a seamless experience for both users and administrators to monitor locations in real-time.

![React](https://img.shields.io/badge/React-18.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![Socket.io](https://img.shields.io/badge/Socket.io-Real--time-orange)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

## 🖼️ Screenshots

### Authentication Page
![Sign Up/ Login Page](/frontend/public/image.png)

### Mobile View
![Sign Up/ Login Page](/frontend/public/mobile_view.png)

### Admin Dashboard
![Admin Dashboard](/frontend/public/new_IMG.png)

### Admin Gets All Users
![All User](/frontend/public/image-3.png)

### User Dashboard
![User Dashboard](/frontend/public/image-2.png)


## ✨ Features

### 🔐 Authentication & Authorization
- **Secure Login/Registration**: JWT-based authentication system
- **Role-based Access Control**: Separate interfaces for Users and Admins
- **Password Security**: Encrypted password storage with bcrypt
- **Session Management**: Persistent login sessions with token validation

### 🗺️ Real-time Location Tracking
- **Live GPS Tracking**: Real-time location updates using browser geolocation API
- **Interactive Maps**: Leaflet.js integration for smooth map interactions
- **Location Markers**: Dynamic markers with user information popups
- **Auto-centering**: Automatic map centering on user locations

### 👥 User Management (Admin Only)
- **User Overview**: Complete list of all registered users
- **Location Monitoring**: Real-time tracking of all user locations
- **User Details**: Detailed user information with location history
- **Status Indicators**: Online/offline status with last seen timestamps

### 📊 Analytics & Insights
- **Location Statistics**: Comprehensive tracking analytics
- **Activity Charts**: Visual representation of location data
- **Weekly Reports**: Automated activity summaries
- **Accuracy Metrics**: GPS and network accuracy monitoring

### 🔒 Privacy & Security
- **Data Control**: Granular privacy settings for users
- **Location Sharing**: Toggle location sharing on/off
- **Data Retention**: Configurable data retention periods
- **Anonymous Mode**: Option to hide user identity

### 🎨 Modern UI/UX
- **Dark/Light Mode**: System-wide theme switching
- **Responsive Design**: Mobile-first responsive layout
- **Glassmorphism**: Modern UI with backdrop blur effects
- **Smooth Animations**: Fluid transitions and micro-interactions

### ⚡ Real-time Features
- **WebSocket Connection**: Socket.io for real-time communication
- **Live Updates**: Instant location updates without page refresh
- **Connection Status**: Real-time connection monitoring
- **Auto-reconnection**: Automatic reconnection on network issues

## 🛠️ Tech Stack

### Frontend
- **React 18.x**: Modern React with hooks and functional components
- **JavaScript (ES6\+)**: Modern JavaScript features and syntax
- **CSS3**: Custom CSS with Tailwind-like utility classes
- **Leaflet.js**: Interactive maps and geolocation
- **Socket.io Client**: Real-time WebSocket communication
- **Lucide React**: Beautiful SVG icons
- **Context API**: State management for theme and authentication

### Backend
- **Node.js 20.x**: Server-side JavaScript runtime
- **Express.js**: Web application framework
- **Socket.io**: Real-time bidirectional communication
- **MongoDB**: NoSQL database for user and location data
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing and encryption
- **CORS**: Cross-origin resource sharing

### Development Tools
- **Create React App**: React application setup
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Git**: Version control
- **npm**: Package management

### Deployment & Infrastructure
- **Vercel**: Frontend deployment (recommended)
- **MongoDB Atlas**: Cloud database hosting
- **Environment Variables**: Secure configuration management

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React)       │    │   (Node.js)     │    │   (MongoDB)     │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │ Auth Pages  │ │    │ │ Auth Routes │ │    │ │ Users       │ │
│ │ Dashboard   │ │◄──►│ │ API Routes  │ │◄──►│ │ Locations   │ │
│ │ Map View    │ │    │ │ Socket.io   │ │    │ │ Sessions    │ │
│ │ Settings    │ │    │ │ Middleware  │ │    │ │             │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Real-time     │
                    │   WebSocket     │
                    │   Connection    │
                    └─────────────────┘
```

### Data Flow
1. **Authentication**: User logs in → JWT token generated → Token stored in localStorage
2. **Location Tracking**: Browser geolocation → WebSocket → Server → Database → Real-time updates
3. **Admin Dashboard**: Database queries → API responses → Real-time user monitoring
4. **Theme Management**: Context API → localStorage → CSS class toggling

## 🚀 Installation

### Prerequisites
- **Node.js** (v20.x or higher)
- **npm** (v9.x or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Git** for version control

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/locationtrack.git
cd locationtrack
```

### 2. Install Dependencies

#### Frontend Dependencies
```bash
npm install
```

#### Backend Dependencies
```bash
cd backend
npm install
```

### 3. Set Up Environment Variables
Create `.env` files in both frontend and backend directories.

#### Frontend (`.env`)
```env
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
REACT_APP_DEFAULT_MAP_CENTER_LAT=40.7128
REACT_APP_DEFAULT_MAP_CENTER_LNG=-74.0060
REACT_APP_DEFAULT_MAP_ZOOM=13
REACT_APP_MAP_PROVIDER=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
```

#### Backend (`backend/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/locationtrack
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### 4. Set Up Database

#### Option A: Local MongoDB
```bash
# Install MongoDB locally
# Start MongoDB service
mongod
```

#### Option B: MongoDB Atlas (Recommended)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in backend `.env`

### 5. Start the Application

#### Start Backend Server
```bash
cd backend
npm run dev
```

#### Start Frontend Development Server
```bash
# In a new terminal, from project root
npm start
```

### 6. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Socket.io**: ws://localhost:5000

## 🔧 Environment Variables

### Frontend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REACT_APP_API_BASE_URL` | Backend API base URL | `http://localhost:5000` | Yes |
| `REACT_APP_SOCKET_URL` | Socket.io server URL | `http://localhost:5000` | Yes |
| `REACT_APP_DEFAULT_MAP_CENTER_LAT` | Default map center latitude | `40.7128` | No |
| `REACT_APP_DEFAULT_MAP_CENTER_LNG` | Default map center longitude | `-74.0060` | No |
| `REACT_APP_DEFAULT_MAP_ZOOM` | Default map zoom level | `13` | No |
| `REACT_APP_MAP_PROVIDER` | Map tile provider URL | OpenStreetMap | No |

### Backend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port number | `5000` | No |
| `MONGODB_URI` | MongoDB connection string | - | Yes |
| `JWT_SECRET` | JWT signing secret | - | Yes |
| `JWT_EXPIRES_IN` | JWT expiration time | `7d` | No |
| `NODE_ENV` | Environment mode | `development` | No |
| `CORS_ORIGIN` | CORS allowed origin | `http://localhost:3000` | No |

## 📖 Usage

### For Regular Users

1. **Registration/Login**
   - Create account with name, email, password
   - Choose "User" role during registration
   - Login with credentials

2. **Location Tracking**
   - Allow browser location permissions
   - Your location will be tracked automatically
   - View your location on the interactive map

3. **Privacy Settings**
   - Control location sharing preferences
   - Set data retention periods
   - Enable/disable real-time tracking

### For Administrators

1. **User Management**
   - View all registered users
   - Monitor real-time locations
   - Check user online/offline status
   - Access detailed user information

2. **Location Monitoring**
   - Click on map markers to see user names
   - View real-time location updates
   - Monitor multiple users simultaneously

3. **System Overview**
   - Track total active users
   - Monitor system performance
   - Access comprehensive analytics

## 📡 API Documentation

### Authentication Endpoints

#### POST `/register`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "user"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "userId": "64f8a1b2c3d4e5f6a7b8c9d0"
}
```

#### POST `/login`
Authenticate user and get JWT token.

**Request Body:**
```json
{
  "name": "John Doe",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "user",
  "message": "Login successful"
}
```

### User Management Endpoints

#### GET `/api/users`
Get all users (Admin only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
[
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2023-09-06T10:30:00.000Z"
  }
]
```

#### GET `/api/user-locations`
Get all user locations (Admin only).

**Response:**
```json
[
  {
    "userId": "64f8a1b2c3d4e5f6a7b8c9d0",
    "latitude": 40.7128,
    "longitude": -74.0060,
    "timestamp": "2023-09-06T10:30:00.000Z"
  }
]
```

### WebSocket Events

#### Client → Server Events

| Event | Description | Data |
|-------|-------------|------|
| `send-location` | Send user location | `{ latitude, longitude }` |
| `connect` | Client connection | Authentication token |
| `disconnect` | Client disconnection | - |

#### Server → Client Events

| Event | Description | Data |
|-------|-------------|------|
| `receive-location` | User's own location | `{ userId, latitude, longitude }` |
| `all-locations` | All user locations (Admin) | Array of location objects |
| `user-connected` | User came online | `{ userId, timestamp }` |
| `user-disconnected` | User went offline | `{ userId, timestamp }` |

## 📁 Project Structure

```
locationtrack/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── AuthPage.jsx
│   │   │   └── AuthForm.jsx
│   │   ├── dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DashboardHeader.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── MapContainer.jsx
│   │   │   └── StatusBar.jsx
│   │   ├── admin/
│   │   │   └── UserManagement.jsx
│   │   ├── user/
│   │   │   |
│   │   │   ├── Privacy.jsx
│   │   │   └── Settings.jsx
│   │   └── common/
│   │       └── LoadingSpinner.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   ├── useAuth.jsx
│   │   ├── useLocationTracking.jsx
│   │   └── useMap.jsx
│   ├── utils/
│   │   └── api.js
│   ├── App.jsx
│   ├── index.jsx
│   └── index.css
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Location.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   └── database.js
│   ├── socket/
│   │   └── socketHandler.js
│   ├── server.js
│   └── package.json
├── package.json
├── .env.example
└── README.md
```

### Key Directories Explained

- **`src/components/`**: React components organized by feature
- **`src/contexts/`**: React Context providers for global state
- **`src/hooks/`**: Custom React hooks for reusable logic
- **`backend/models/`**: MongoDB/Mongoose data models
- **`backend/routes/`**: Express.js API route handlers
- **`backend/middleware/`**: Custom middleware functions
- **`backend/socket/`**: Socket.io event handlers


### Available Scripts

#### Frontend
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
```

#### Backend
```bash
npm run dev        # Start with nodemon (development)
npm start          # Start production server
npm run test       # Run tests
```

#### Frontend Build
```bash
npm run build
```

#### Backend Production
```bash
cd backend
npm start
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
   ```bash
   git fork https://github.com/Sheryar-bit/Live-Location-Tracking.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Commit Changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```

4. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open Pull Request**

## Contact 📧

For questions or feedback, feel free to reach out:

- **Name**: Muhammad Sheryar  
- **Email**: alisharyar93@gmail.com  
- **GitHub**: [Sheryar-bit](https://github.com/Sheryar-bit)  
- **LinkedIn**: [LinkedIn Profile](https://pk.linkedin.com/in/httsheryar-ali-53349a219)
