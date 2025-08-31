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

if (!isset($_SESSION['user_id'])) {
    error_log("Upload failed: User not authenticated");
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Unauthorized']);
    exit;
}

$uploadDir = 'uploads/';
if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

include 'db.php';

try {
    $scan_id = uniqid('scan_');

    // === Case 1: JSON input (Git URL) ===
    if ($_SERVER['CONTENT_TYPE'] === 'application/json') {
        $input = json_decode(file_get_contents('php://input'), true);

        if (empty($input['repo_url'])) {
            error_log("No repo_url in JSON");
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Missing repo_url']);
            exit;
        }

        $repoUrl = trim($input['repo_url']);

        // Validate GitHub URL
        if (!filter_var($repoUrl, FILTER_VALIDATE_URL) || strpos($repoUrl, 'github.com') === false) {
            error_log("Invalid GitHub URL: " . $repoUrl);
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid GitHub repository URL']);
            exit;
        }

        // Normalize: ensure ends with .git
        if (!str_ends_with($repoUrl, '.git')) {
            $repoUrl .= '.git';
        }

        $filename = $uploadDir . $scan_id . '.git.txt';
        file_put_contents($filename, $repoUrl);  // Save URL to file

        error_log("Git URL saved: $repoUrl with scan_id: $scan_id");

        // Save to database
        $stmt = $pdo->prepare("INSERT INTO apps (user_id, name, scan_id, status, last_scan) VALUES (?, ?, ?, 'pending', NOW())");
        $stmt->execute([$_SESSION['user_id'], 'GitHub Repo', $scan_id]);

        echo json_encode([
            'success' => true,
            'message' => 'Repository URL accepted',
            'scan_id' => $scan_id,
            'estimated_time' => 15,
            'repo_url' => $repoUrl
        ]);
        exit;
    }

    // === Case 2: File upload (FormData) ===
    if (isset($_FILES['file'])) {
        $file = $_FILES['file'];
        $originalName = basename($file['name']);
        $filename = $uploadDir . $scan_id . '-' . $originalName;

        error_log("Attempting to move file from: " . $file['tmp_name'] . " to: " . $filename);

        if (move_uploaded_file($file['tmp_name'], $filename)) {
            error_log("File moved successfully to: " . $filename);

            // Save to database
            $stmt = $pdo->prepare("INSERT INTO apps (user_id, name, scan_id, status, last_scan) VALUES (?, ?, ?, 'pending', NOW())");
            $stmt->execute([$_SESSION['user_id'], $originalName, $scan_id]);

            error_log("Database insert successful. Scan ID: " . $scan_id);

            echo json_encode([
                'success' => true,
                'message' => 'File uploaded successfully',
                'scan_id' => $scan_id,
                'estimated_time' => 10,
                'filename' => $filename
            ]);
        } else {
            error_log("Failed to move uploaded file. Upload error: " . $file['error']);
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'File move failed. Error code: ' . $file['error']
            ]);
        }
        exit;
    }

    // === No valid input ===
    error_log("No file or repo_url received");
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'No file or repository URL sent']);

} catch (Exception $e) {
    error_log("Unexpected error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server error: ' . $e->getMessage()]);
}

// In upload.php — after successful session check

if ($_SERVER['CONTENT_TYPE'] === 'application/json') {
    $input = json_decode(file_get_contents('php://input'), true);
    $repoUrl = trim($input['repo_url'] ?? '');

    if (empty($repoUrl) || !filter_var($repoUrl, FILTER_VALIDATE_URL) || strpos($repoUrl, 'github.com') === false) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid GitHub URL']);
        exit;
    }

    // Add .git if missing
    if (!str_ends_with($repoUrl, '.git')) {
        $repoUrl .= '.git';
    }

    $scan_id = uniqid('scan_');
    $uploadDir = 'uploads/';
    if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

    // Save URL to a file: uploads/scan_xxx.git.txt
    $urlFile = $uploadDir . $scan_id . '.git.txt';
    file_put_contents($urlFile, $repoUrl);

    // Save to DB
    include 'db.php';
    $stmt = $pdo->prepare("INSERT INTO apps (user_id, name, scan_id, status, last_scan, type) VALUES (?, ?, ?, 'pending', NOW(), 'git')");
    $stmt->execute([$_SESSION['user_id'], 'GitHub Repo', $scan_id]);

    echo json_encode([
        'success' => true,
        'scan_id' => $scan_id,
        'message' => 'Repository queued for scanning'
    ]);
    exit;
}
?>