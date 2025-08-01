require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));
 
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    // app.use(express.static(path.join(__dirname, "")));
    app.use(express.static('public'));

    // app.use(express.static('public'));
app.get('/', (req, res) => {
  res.render('index');
});

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true }, 
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }
});

const User = mongoose.model("User", userSchema);


// Location Schema
const locationSchema = new mongoose.Schema({
    userId: String,
    latitude: Number,
    longitude: Number,
    timestamp: { type: Date, default: Date.now },
});

const Location = mongoose.model("Location", locationSchema);

// User Registration
app.post("/register", async (req, res) => {
    try {
        console.log("Registration request received:", req.body);
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            console.log("Missing required fields");
            return res.status(400).json({ error: "Name, email, and password are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Registration failed: Email already exists");
            return res.status(400).json({ error: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role: role || "user" });
        await newUser.save();

        console.log("User registered successfully:", newUser);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(400).json({ error: error.message || "Registration failed" });
    }
});

// User Login
app.post("/login", async (req, res) => {
    try {
        console.log("Login request received:", req.body);
        const { name, password } = req.body;

        if (!name || !password) {
            console.log("Missing required fields");
            return res.status(400).json({ error: "Name and password are required" });
        }
        const user = await User.findOne({ name });
        if (!user) {
            console.log("Login failed: User not found");
            return res.status(401).json({ error: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Login failed: Invalid credentials");
            return res.status(401).json({ error: "Invalid credentials" });
        }
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not set");
            throw new Error('JWT_SECRET is not set');
        }
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        console.log("Login successful for user:", user.name);
        res.json({ token, role: user.role });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Login failed", details: error.message });
    }
});

// Middleware to Verify JWT Token

const authenticate = (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Authentication required"));
    if (!process.env.JWT_SECRET) {
      return next(new Error("JWT_SECRET is not set"));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return next(new Error("Invalid token"));
        socket.userId = decoded.userId;
        next();
    });
};

// Protectingg WebSocket Connection
io.use(authenticate);

io.on("connection", (socket) => {
    console.log("User connected:", socket.userId);

    socket.on("send-location", async (data) => {
        console.log("Received location:", data);

        const newLocation = new Location({
            userId: socket.userId,
            latitude: data.latitude,
            longitude: data.longitude,
        });

        await newLocation.save();

        // Send locations based on role
        const user = await User.findById(socket.userId);
        if (user.role === "admin") {
            // Admin sees all locations
            const locations = await Location.find({});
            io.to(socket.id).emit("all-locations", locations);
        } else {
            io.to(socket.id).emit("receive-location", {
                id: socket.userId,
                latitude: data.latitude,
                longitude: data.longitude,
            });
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.userId);
    });
});


// Get all users (admin only)
app.get("/api/users", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const adminUser = await User.findById(decoded.userId);
        
        if (adminUser.role !== 'admin') {
            return res.status(403).json({ error: "Admin access required" });
        }

        const users = await User.find({}, { password: 0 }); 
        res.json(users);
    } catch (error) {
        console.error("Get users error:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// Get user locations (admin only)
app.get("/api/user-locations", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const adminUser = await User.findById(decoded.userId);
        
        if (adminUser.role !== 'admin') {
            return res.status(403).json({ error: "Admin access required" });
        }

        // Get latest location for each user
        const locations = await Location.aggregate([
            {
                $sort: { timestamp: -1 }
            },
            {
                $group: {
                    _id: "$userId",
                    latitude: { $first: "$latitude" },
                    longitude: { $first: "$longitude" },
                    timestamp: { $first: "$timestamp" }
                }
            }
        ]);

        // Get user details for each location
        const userLocations = await Promise.all(
            locations.map(async (location) => {
                const user = await User.findById(location._id, { password: 0 });
                return {
                    userId: location._id,
                    user: user,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    timestamp: location.timestamp
                };
            })
        );

        res.json(userLocations);
    } catch (error) {
        console.error("Get user locations error:", error);
        res.status(500).json({ error: "Failed to fetch user locations" });
    }
});

const PORT = process.env.PORT || 5000;
server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});





