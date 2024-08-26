<?php
// Mendapatkan nama file dari parameter URL
$file = $_GET['file'];

// Path dasar direktori di mana file disimpan
$baseDir = __DIR__ . '/files/';

// Mencoba membuka file
$filePath = $baseDir . $file;

if (file_exists($filePath)) {
    // Menampilkan isi file
    echo file_get_contents($filePath);
} else {
    echo "File tidak ditemukan.";
}
?>
