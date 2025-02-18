# Live Location Tracking System 🌍

![Project Banner](![image](https://github.com/user-attachments/assets/3f6dd08b-36cb-4f94-81ac-695b0e78df41)

The **Live Location Tracking System** is a real-time application that allows users to share their live location and admins to view the locations of all users on a map. Built with **Node.js**, **Express**, **Socket.IO**, and **MongoDB**, this system is designed for simplicity, scalability, and real-time interaction.

---

## Features ✨

- **User Registration & Login**: Users can register and log in with their name, email, and password.
- **Role-Based Access**:
  - **Users**: Can share their live location.
  - **Admins**: Can view the live locations of all users on a map.
- **Real-Time Updates**: Locations are updated in real-time using **Socket.IO**.
- **Interactive Map**: Built with **Leaflet.js**, the map displays user locations with markers.
- **Responsive Design**: The frontend is fully responsive and works seamlessly on both desktop and mobile devices.

---

## Technologies Used 🛠️

- **Backend**:
  - Node.js
  - Express.js
  - Socket.IO
  - MongoDB (with Mongoose)
  - Bcrypt (for password hashing)
  - JSON Web Tokens (JWT) for authentication

- **Frontend**:
  - HTML5, CSS3, JavaScript
  - Leaflet.js (for interactive maps)
  - Fetch API (for HTTP requests)

- **Tools**:
  - Dotenv (for environment variables)
  - Nodemon (for development)

---

## Screenshots 📸

### User View
![User View](![image](https://github.com/user-attachments/assets/5e8c4843-aad8-4f41-82df-4af05484c50d)

### Admin View
![Admin View](![image](https://github.com/user-attachments/assets/76a16d7f-d8b2-4939-9ae3-970c62f95747)

---

## Getting Started 🚀

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git (for cloning the repository)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/live-location-tracking.git
   cd live-location-tracking
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=mongodb://localhost:27017/YOURCONNECTION
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. **Start the server**:
   ```bash
   npm start
   ```

5. **Access the application**:
   Open your browser and navigate to `http://localhost:5000`.

---

## Usage 📖

### Registration
1. Fill out the registration form with your name, email, password, and role (user or admin).
2. Click **Register**.

### Login
1. Enter your email and password.
2. Click **Login**.

### Sharing Location
- After logging in, the application will automatically start sharing your live location (if you are a user).
- Admins can view the live locations of all users on the map.

---

## API Endpoints 🌐

### Authentication
- **POST /register**: Register a new user.
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }
  ```

- **POST /login**: Log in an existing user.
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Location Tracking
- **Socket.IO Event: send-location**: Send live location data to the server.
  ```json
  {
    "latitude": 12.34,
    "longitude": 56.78
  }
  ```

- **Socket.IO Event: all-locations**: Receive all user locations (admin only).
- **Socket.IO Event: receive-location**: Receive your own location (user only).

---

## Folder Structure 📂

```
live-location-tracking/
├── public/              # Static files (CSS, JS, images)
│   ├── css/
│   └── js/
├── views/               # EJS templates (if applicable)
├── server.js            # Main server file
├── index.js             # Frontend JavaScript
├── package.json         # Node.js dependencies
├── .env                 # Environment variables
└── README.md            # Project documentation
```

---

## Contributing 🤝

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---

## Acknowledgments 🙏

- **Leaflet.js** for the interactive map.
- **Socket.IO** for real-time communication.
- **MongoDB** for database management.

---

## Contact 📧

For questions or feedback, feel free to reach out:

- **Name**: Muhammad Sheryar  
- **Email**: alisharyar93@gmail.com  
- **GitHub**: [Sheryar-bit](https://github.com/Sheryar-bit)  
- **LinkedIn**: [LinkedIn Profile](https://pk.linkedin.com/in/httsheryar-ali-53349a219)
