const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { message: '' });
});

app.post('/submit', (req, res) => {
    const message = req.body.message;
    res.render('index', { message: message });
});

app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
