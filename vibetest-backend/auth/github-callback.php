


<?php
// Allow from any origin during development (lock down in production)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Handle preflight (OPTIONS) request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();
$client_id = 'YOUR_CLIENT_ID';
$client_secret = 'YOUR_CLIENT_SECRET';
$code = $_GET['code'];

// Get access token
$token_response = file_get_contents(
    'https://github.com/login/oauth/access_token',
    false,
    stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => [
                'Content-Type: application/json',
                'Accept: application/json'
            ],
            'content' => json_encode([
                'client_id' => $client_id,
                'client_secret' => $client_secret,
                'code' => $code
            ])
        ]
    ])
);
$token_data = json_decode($token_response, true);
$access_token = $token_data['access_token'];

// Get user data
$user_response = file_get_contents('https://api.github.com/user', false, stream_context_create([
    'http' => ['header' => "User-Agent: VibeTest\r\nAuthorization: Bearer $access_token"]
]));
$user_data = json_decode($user_response, true);

$email = $user_data['email'] ?? $user_data['login'] . '@github.com';

// Check or create user
include '../db.php';
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user) {
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password, created_at) VALUES (?, ?, '', NOW())");
    $stmt->execute([$user_data['name'] ?? $user_data['login'], $email]);
    $user_id = $pdo->lastInsertId();
    $user = ['id' => $user_id, 'name' => $user_data['name'], 'email' => $email, 'plan' => 'Free'];
} else {
    $user_id = $user['id'];
}

$_SESSION['user_id'] = $user_id;

// Redirect to frontend with success
header("Location: http://localhost:5173/dashboard");
?>