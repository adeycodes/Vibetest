<?php
// Try different MySQL connection methods
$connection_attempts = [
    // Method 1: root with no password
    ['mysql:host=127.0.0.1;dbname=vibetest', 'root', ''],
    // Method 2: root with socket authentication (common on Ubuntu)
    ['mysql:host=localhost;dbname=vibetest', 'root', ''],
    // Method 3: Create a vibetest user if needed
    ['mysql:host=127.0.0.1;dbname=vibetest', 'vibetest', 'vibetest123']
];

$pdo = null;
$last_error = '';

foreach ($connection_attempts as $attempt) {
    try {
        $pdo = new PDO($attempt[0], $attempt[1], $attempt[2]);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        break; // Success!
    } catch (PDOException $e) {
        $last_error = $e->getMessage();
        continue;
    }
}

if (!$pdo) {
    http_response_code(500);
    echo json_encode([
        'error' => 'DB connection failed',
        'details' => $last_error,
        'note' => 'You may need to create a MySQL user: CREATE USER "vibetest"@"localhost" IDENTIFIED BY "vibetest123"; GRANT ALL ON vibetest.* TO "vibetest"@"localhost";'
    ]);
    exit();
}
?>