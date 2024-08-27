const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Konfigurasi sesi
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: true, secure: false } // Set to true for HTTPS
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Dummy user data
const users = [{ id: 1, username: 'user1', password: 'password1' }];

// Halaman login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Proses login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).send('Invalid credentials');
  }

  // Regenerasi session ID setelah login untuk mencegah session fixation
  req.session.regenerate((err) => {
    if (err) {
      console.error('Session regeneration failed:', err);
      return res.status(500).send('Internal Server Error');
    }

    // Simpan informasi pengguna di sesi
    req.session.user = { id: user.id, username: user.username };
    res.redirect('/dashboard');
  });
});

// Halaman dashboard yang dilindungi
app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.status(401).send('Please login to access this page');
  }

  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Proses logout
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Failed to log out');
    }

    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

