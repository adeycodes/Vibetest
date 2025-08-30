<?php
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploadDir = 'uploads/';
    if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

    if (isset($_FILES['file'])) {
        $file = $_FILES['file'];
        $filename = $uploadDir . uniqid() . '-' . basename($file['name']);
        if (move_uploaded_file($file['tmp_name'], $filename)) {
            echo json_encode([
                'success' => true,
                'message' => 'File uploaded',
                'scan_id' => uniqid(),
                'estimated_time' => 10
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Upload failed']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'No file sent']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>