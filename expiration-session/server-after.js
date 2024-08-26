const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 } // Cookie sesi akan kedaluwarsa setelah 1 menit (60.000 milidetik)
}));

// app.get('/', (req, res) => {
//     res.redirect('/login');
//   });

app.get('/login', (req, res) => {
  req.session.user = 'testuser';
  res.send('Login berhasil. Sesi aktif.');
});

app.get('/profile', (req, res) => {
  if (req.session.user) {
    res.send('Selamat datang di profil Anda.');
  } else {
    res.status(401).send('Sesi tidak ditemukan atau telah kedaluwarsa. Silakan login kembali.');
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
