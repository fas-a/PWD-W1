<?php
// Menambahkan header X-XSS-Protection untuk mengaktifkan perlindungan XSS di browser
header('X-XSS-Protection: 1; mode=block');
?>

<!DOCTYPE html>
<html>
<head>
    <title>Formulir Input XSS Protection</title>
</head>
<body>
    <h1>Formulir Input</h1>
    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
        <label for="name">Nama:</label>
        <input type="text" id="name" name="name">
        <br>
        <label for="message">Pesan:</label>
        <textarea id="message" name="message"></textarea>
        <br>
        <input type="submit" value="Kirim">
    </form>

    <?php if ($_SERVER["REQUEST_METHOD"] == "POST"): ?>
        <h2>Data yang Dikirim:</h2>
        <p><strong>Nama:</strong> <?php echo $_POST['name']; ?></p>
        <p><strong>Pesan:</strong> <?php echo $_POST['message']; ?></p>
    <?php endif; ?>
</body>
</html>
