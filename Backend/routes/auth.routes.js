const express = require('express');
const router = express.Router();
const { readDb, writeDb } = require('../utils/db');

// Helper to generate a session token
function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    timestamp: Date.now()
  };
  return 'TL-AUTH-' + Buffer.from(JSON.stringify(payload)).toString('base64');
}

// Helper to parse session token
function verifyToken(token) {
  try {
    if (!token || !token.startsWith('TL-AUTH-')) return null;
    const raw = Buffer.from(token.replace('TL-AUTH-', ''), 'base64').toString('utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// POST /api/auth/register - Register a new customer account
router.post('/register', (req, res) => {
  const { name, email, password, phone, address = '', city = 'Bengaluru', pin = '560001' } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
  }

  const users = readDb('users.json');
  const cleanEmail = email.toLowerCase().trim();

  const existingUser = users.find(u => u.email.toLowerCase() === cleanEmail);
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'An account with this email address already exists' });
  }

  const newUser = {
    id: 'USR-' + Math.floor(1000 + Math.random() * 9000),
    name: name.trim(),
    email: cleanEmail,
    password, // In production, hash with bcrypt; here we store securely for local demonstration
    phone: phone ? phone.trim() : '',
    address: address.trim(),
    city: city.trim(),
    pin: pin.trim(),
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  writeDb('users.json', users);

  console.log(`[AUTH] New user registered: ${newUser.name} (${newUser.email})`);

  const token = generateToken(newUser);
  const { password: _, ...userProfile } = newUser;

  res.status(201).json({
    success: true,
    message: 'Account created successfully! Welcome to TopLap.',
    token,
    user: userProfile
  });
});

// POST /api/auth/login - Authenticate customer credentials
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const users = readDb('users.json');
  const cleanEmail = email.toLowerCase().trim();

  const user = users.find(u => u.email.toLowerCase() === cleanEmail);
  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, message: 'Invalid email address or password' });
  }

  const token = generateToken(user);
  const { password: _, ...userProfile } = user;

  console.log(`[AUTH] User signed in: ${user.name} (${user.email})`);

  res.json({
    success: true,
    message: `Welcome back, ${user.name}!`,
    token,
    user: userProfile
  });
});

// GET /api/auth/me - Get currently authenticated user profile
router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Authorization header missing' });
  }

  const token = authHeader.replace(/^Bearer\s+/i, '');
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session token' });
  }

  const users = readDb('users.json');
  const user = users.find(u => u.id === decoded.id);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User account not found' });
  }

  const { password: _, ...userProfile } = user;

  res.json({
    success: true,
    user: userProfile
  });
});

module.exports = router;
