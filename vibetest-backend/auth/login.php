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

session_start();
include '../db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Debug: Log the received data
    error_log("Login attempt - Data received: " . json_encode($data));
    
    if (!$data || !isset($data['email']) || !isset($data['password'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Missing email or password']);
        exit;
    }
    
    $email = strtolower(trim($data['email']));
    $password = $data['password'];
    
    error_log("Login attempt - Email: $email");

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    error_log("Login attempt - User found: " . ($user ? "Yes" : "No"));

    if ($user && password_verify($password, $user['password'])) {
        unset($user['password']); // Never send password
        $_SESSION['user_id'] = $user['id'];
        error_log("Login successful for user: " . $user['email']);
        echo json_encode(['success' => true, 'user' => $user]);
    } else {
        error_log("Login failed - Invalid credentials for: $email");
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
    }
}
?>