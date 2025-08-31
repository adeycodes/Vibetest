<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include '../db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Debug: Log the received data
    error_log("Signup attempt - Data received: " . json_encode($data));
    
    if (!$data || !isset($data['name']) || !isset($data['email']) || !isset($data['password'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Missing required fields']);
        exit;
    }
    
    $name = trim($data['name']);
    $email = strtolower(trim($data['email']));
    $password = $data['password'];
    
    error_log("Signup attempt - Name: $name, Email: $email");

    if (strlen($password) < 6) {
        http_response_code(400);
        echo json_encode(['message' => 'Password must be at least 6 characters']);
        exit;
    }

    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode(['message' => 'Email already exists']);
        exit;
    }

    $hashed = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, NOW())");
    if ($stmt->execute([$name, $email, $hashed])) {
        $user_id = $pdo->lastInsertId();
        echo json_encode([
            'success' => true,
            'user' => ['id' => $user_id, 'name' => $name, 'email' => $email, 'plan' => 'Free']
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Signup failed']);
    }
}
?>