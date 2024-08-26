const express = require('express');
const helmet = require('helmet');

const app = express();

// Set EJS sebagai view engine
app.set('view engine', 'ejs');

// Menggunakan Helmet untuk menerapkan Content Security Policy (CSP)
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'nonce-123456'"],
            objectSrc: ["'none'"],
            styleSrc: ["'self'"],
            imgSrc: ["'self'"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'"],
            frameSrc: ["'none'"],
            upgradeInsecureRequests: [],
        },
    })
);

// Route untuk halaman utama
app.get('/', (req, res) => {
    const userInput = req.query.input || 'No user input';
    res.render('index', { userInput });
});

// Jalankan server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
