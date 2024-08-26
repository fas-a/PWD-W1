const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

// Daftar file yang diperbolehkan (whitelist)
const allowedFiles = ['test.txt', 'report.txt'];

app.get('/api/file', (req, res) => {
    const filename = req.query.filename;

    // Cek apakah file termasuk dalam daftar whitelist
    if (allowedFiles.includes(filename)) {
        const filePath = path.join(__dirname, 'uploads', filename);

        fs.access(filePath, fs.constants.R_OK, (err) => {
            if (err) {
                return res.status(404).send('File not found');
            }
            res.sendFile(filePath);
        });
    } else {
        res.status(400).send('Access to this file is not allowed');
    }
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
