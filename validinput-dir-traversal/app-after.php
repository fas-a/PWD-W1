<?php
// Mendapatkan nama file dari parameter URL
$file = $_GET['file'];

// Path dasar direktori di mana file disimpan
$baseDir = __DIR__ . '/files/';

// Validasi: Pastikan tidak ada karakter traversal direktori ('../') dalam nama file
if (strpos($file, '../') !== false || strpos($file, '..\\') !== false) {
    die("Invalid file name.");
}

// Mencoba membuka file
$filePath = $baseDir . basename($file);

if (file_exists($filePath)) {
    // Menampilkan isi file
    echo file_get_contents($filePath);
} else {
    echo "File tidak ditemukan.";
}
?>
