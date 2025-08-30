// vibetest-backend/scan/run.php

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
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$uploadDir = 'uploads/';
$zipFile = $_FILES['file']['tmp_name'];
$extractDir = $uploadDir . uniqid();

mkdir($extractDir, 0777, true);
$zip = new ZipArchive;
if ($zip->open($zipFile) === TRUE) {
    $zip->extractTo($extractDir);
    $zip->close();

    // Run Python scanner
    $output = shell_exec("python3 ../scanner/scan_app.py '$extractDir' 2>&1");
    $result = json_decode($output, true);

    // Save to DB
    include '../db.php';
    $stmt = $pdo->prepare("INSERT INTO apps (user_id, name, scan_id, status, last_scan) VALUES (?, ?, ?, 'completed', NOW())");
    $stmt->execute([$_SESSION['user_id'], $_FILES['file']['name'], $scanId = uniqid('scan_')]);

    $appId = $pdo->lastInsertId();
    $stmt = $pdo->prepare("INSERT INTO scan_results (app_id, bugs_found, performance_score, security_issues, report_json) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([
        $appId,
        $result['bugs_found'] ?? 0,
        $result['performance_score'] ?? 50,
        $result['security_issues'] ?? 0,
        json_encode($result)
    ]);

    echo json_encode(['success' => true, 'result' => $result, 'scan_id' => $scanId]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Extract failed']);
}
?>