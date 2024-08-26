<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>XSS Prevention - Input Validation</title>
</head>
<body>
    <h1>Comment Section</h1>
    <form method="post" action="">
        <label for="username">Name:</label><br>
        <input type="text" id="username" name="username" required><br><br>
        
        <label for="comment">Comment:</label><br>
        <textarea id="comment" name="comment" rows="4" cols="50" required></textarea><br><br>
        
        <input type="submit" value="Submit">
    </form>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Ambil input
        $username = trim($_POST['username']);
        $comment = trim($_POST['comment']);

        // Validasi panjang input
        if (strlen($username) > 100) {
            echo "<p>Error: Username terlalu panjang. Maksimum 100 karakter.</p>";
        } elseif (strlen($comment) > 500) {
            echo "<p>Error: Comment terlalu panjang. Maksimum 500 karakter.</p>";
        } else {
            // Cek apakah input mengandung tag HTML atau skrip
            if (preg_match('/<script\b[^>]*>(.*?)<\/script>/is', $username) || preg_match('/<script\b[^>]*>(.*?)<\/script>/is', $comment)) {
                echo "<p>Error: Input tidak boleh mengandung skrip HTML atau JavaScript.</p>";
            } else {
                // Output valid data dengan sanitasi output
                echo "<h2>New Comment:</h2>";
                echo "<p><strong>" . htmlspecialchars($username, ENT_QUOTES, 'UTF-8') . ":</strong> " . htmlspecialchars($comment, ENT_QUOTES, 'UTF-8') . "</p>";
            }
        }
    }
    ?>
</body>
</html>
