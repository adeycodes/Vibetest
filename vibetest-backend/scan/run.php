<?php
// =============== STEP 1: START BUFFERING (MOST IMPORTANT) ===============
ob_start(); // 🛑 Trap ALL output — even errors

// =============== STEP 2: HEADERS ===============
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// =============== STEP 3: PREFLIGHT ===============
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    ob_clean();
    http_response_code(200);
    exit();
}

// =============== STEP 4: SESSION & AUTH ===============
session_start();

error_log("Scan request received. Method: " . $_SERVER['REQUEST_METHOD']);
error_log("Session ID: " . session_id());
error_log("Session user_id: " . ($_SESSION['user_id'] ?? 'not set'));
error_log("POST data: " . json_encode($_POST));

if (!isset($_SESSION['user_id'])) {
    ob_clean();
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

// =============== STEP 5: GET scan_id ===============
$scan_id = null;
if (isset($_POST['scan_id'])) {
    $scan_id = $_POST['scan_id'];
} else {
    $input = json_decode(file_get_contents('php://input'), true);
    if (isset($input['scan_id'])) {
        $scan_id = $input['scan_id'];
    }
}

if (!$scan_id) {
    ob_clean();
    http_response_code(400);
    echo json_encode(['error' => 'Missing scan_id']);
    exit;
}

try {
    include '../db.php';

    // Get app
    $stmt = $pdo->prepare("SELECT id, user_id FROM apps WHERE scan_id = ? AND user_id = ?");
    $stmt->execute([$scan_id, $_SESSION['user_id']]);
    $app = $stmt->fetch();

    if (!$app) {
        throw new Exception('App not found');
    }

    $uploadDir = realpath('../uploads') . '/';
    $pattern = $uploadDir . $scan_id . '-*';
    $files = glob($pattern);

    if (empty($files)) {
        throw new Exception('Uploaded file not found');
    }

    $filePath = $files[0];
    $extractDir = $uploadDir . 'extracted_' . $scan_id;

    // Clean & create extract dir
    if (is_dir($extractDir)) {
        exec("rm -rf " . escapeshellarg($extractDir));
    }
    mkdir($extractDir, 0777, true);

    // Extract or copy
    $ext = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));

    if ($ext === 'zip') {
        $zip = new ZipArchive;
        if ($zip->open($filePath) !== TRUE) {
            throw new Exception('Failed to open ZIP');
        }
        if ($zip->extractTo($extractDir) !== TRUE) {
            $zip->close();
            throw new Exception('Failed to extract ZIP');
        }
        $zip->close();
    } else {
        copy($filePath, $extractDir . '/' . basename($filePath));
    }

    // Run scanner
    $scannerPath = realpath(__DIR__ . '/../../scanner/scan_app.py');
    if (!$scannerPath) {
        throw new Exception('Scanner script not found');
    }

    $command = "python3 " . escapeshellarg($scannerPath) . " " . escapeshellarg($extractDir) . " 2>&1";
    $output = shell_exec($command);

    error_log("Python output: $output"); // Debug: check what Python returned

    $result = json_decode($output, true);

    if (!$result) {
        // Scanner didn't return valid JSON — fallback
        throw new Exception('Invalid scanner output: ' . substr($output, 0, 200));
    }

    // Save to DB
    $stmt = $pdo->prepare("UPDATE apps SET status = 'completed', last_scan = NOW() WHERE id = ?");
    $stmt->execute([$app['id']]);

    $stmt = $pdo->prepare("INSERT INTO scan_results (app_id, bugs_found, performance_score, security_issues, report_json, generated_at) VALUES (?, ?, ?, ?, ?, NOW())");
    $stmt->execute([
        $app['id'],
        $result['bugs_found'] ?? 0,
        $result['performance_score'] ?? 75,
        $result['security_issues'] ?? 0,
        json_encode($result)
    ]);

    // Cleanup
    exec("rm -rf " . escapeshellarg($extractDir));

    // =============== FINAL OUTPUT ===============
    ob_clean(); // 🔴 CRITICAL: Remove any warning, log, or space
    echo json_encode([
        'success' => true,
        'scan_id' => $scan_id,
        'result' => $result
    ]);

} catch (Exception $e) {
    error_log("Scan failed: " . $e->getMessage());
    
    ob_clean(); // 🔴 Clear any garbage before error
    http_response_code(500);
    echo json_encode([
        'error' => 'Scan failed',
        'details' => $e->getMessage()
    ]);
}

exit;