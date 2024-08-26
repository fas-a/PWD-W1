<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>XSS Vulnerable Website</title>
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
        $username = $_POST['username'];
        $comment = $_POST['comment'];

        // Vulnerable to XSS because there's no escaping or sanitization
        echo "<h2>New Comment:</h2>";
        echo "<p><strong>" . $username . ":</strong> " . $comment . "</p>";
    }
    ?>
</body>
</html>
