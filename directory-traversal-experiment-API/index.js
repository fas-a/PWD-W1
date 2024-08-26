const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API untuk mengakses file di direktori yang ditentukan
app.get('/api/file', (req, res) => {
    const filename = req.query.filename; // Menggunakan query parameter untuk filename

    if (!filename) {
        return res.status(400).send('Filename is required');
    }

    // Manual path handling to prevent directory traversal
    const sanitizedPath = path.normalize(filename).replace(/^(\.\.(\/|\\|$))+/, '');
    const filePath = path.join(__dirname, 'uploads', sanitizedPath);

    // Memastikan bahwa file hanya bisa diakses dari direktori 'uploads'
    if (filePath.startsWith(path.join(__dirname, 'uploads'))) {
        fs.access(filePath, fs.constants.R_OK, (err) => {
            if (err) {
                return res.status(404).send('File not found or error occurred.');
            }
            res.sendFile(filePath);
        });
    } else {
        res.status(400).send('Invalid file path');
    }
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});