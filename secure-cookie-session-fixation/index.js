const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const app = express();
app.use(helmet());
app.use(cookieParser());

app.use(session({
  name: 'sessionId',
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false,
  //delete the cookie if you want this not secure
  cookie: {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: true, // Ensures the cookie is sent over HTTPS only
  }
}));

app.get('/', (req, res) => {
  if (!req.session.views) {
    req.session.views = 1;
  } else {
    req.session.views++;
  }
  res.send(`You have viewed this page ${req.session.views} times`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
