// server.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const scoreRoutes = require('./routes/score');
const User = require('./models/User');
const app = express();

dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,POST',
  credentials: true, // Ensure cookies are sent with requests
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Session Management
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Make sure secure cookies are only used in production
    maxAge: 1000 * 60 * 60 * 24, // 1-day session expiry
    sameSite: 'None',
  },
}));


// Session check route
app.get('/api/auth/check-session', (req, res) => {
  if (req.session.userId) { // Check for userId from session
    res.json({ authenticated: true, username: req.session.username });
  } else {
    res.json({ authenticated: false });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/scores', scoreRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
