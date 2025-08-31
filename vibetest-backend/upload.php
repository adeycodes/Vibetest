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

// Add error logging
error_log("Upload request received. Method: " . $_SERVER['REQUEST_METHOD']);
error_log("Session user_id: " . ($_SESSION['user_id'] ?? 'not set'));
error_log("Files received: " . json_encode($_FILES));

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if user is logged in
    if (!isset($_SESSION['user_id'])) {
        error_log("Upload failed: User not authenticated");
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Unauthorized']);
        exit;
    }
    
    $uploadDir = 'uploads/';
    if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

    if (isset($_FILES['file'])) {
        $file = $_FILES['file'];
        $scan_id = uniqid('scan_');
        $filename = $uploadDir . $scan_id . '-' . basename($file['name']);
        
        error_log("Attempting to move file from: " . $file['tmp_name'] . " to: " . $filename);
        
        if (move_uploaded_file($file['tmp_name'], $filename)) {
            error_log("File moved successfully to: " . $filename);
            
            // Save to database
            include 'db.php';
            try {
                error_log("Attempting database insert for user_id: " . $_SESSION['user_id']);
                $stmt = $pdo->prepare("INSERT INTO apps (user_id, name, scan_id, status, last_scan) VALUES (?, ?, ?, 'pending', NOW())");
                $stmt->execute([$_SESSION['user_id'], $file['name'], $scan_id]);
                
                error_log("Database insert successful. Scan ID: " . $scan_id);
                
                echo json_encode([
                    'success' => true,
                    'message' => 'File uploaded successfully',
                    'scan_id' => $scan_id,
                    'estimated_time' => 10,
                    'filename' => $filename
                ]);
            } catch (PDOException $e) {
                error_log("Database error: " . $e->getMessage());
                http_response_code(500);
                echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
            }
        } else {
            error_log("Failed to move uploaded file. Upload error: " . $file['error']);
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'File move failed. Error code: ' . $file['error']]);
        }
    } else {
        error_log("No file received in upload request");
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'No file sent']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>