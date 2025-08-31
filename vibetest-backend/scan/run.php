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

// Add error logging
error_log("Scan request received. Method: " . $_SERVER['REQUEST_METHOD']);
error_log("Session ID: " . session_id());
error_log("Session user_id: " . ($_SESSION['user_id'] ?? 'not set'));
error_log("All session data: " . json_encode($_SESSION));
error_log("POST data: " . json_encode($_POST));
error_log("Cookies: " . json_encode($_COOKIE));

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

// Handle both file upload and scan_id parameter
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include '../db.php';
    
    // Check if this is a scan request with scan_id
    $scan_id = null;
    if (isset($_POST['scan_id'])) {
        $scan_id = $_POST['scan_id'];
    } else {
        // Try to get from JSON input
        $input = json_decode(file_get_contents('php://input'), true);
        if (isset($input['scan_id'])) {
            $scan_id = $input['scan_id'];
        }
    }
    
    if ($scan_id) {
        
        // Find the uploaded file
        $stmt = $pdo->prepare("SELECT * FROM apps WHERE scan_id = ? AND user_id = ?");
        $stmt->execute([$scan_id, $_SESSION['user_id']]);
        $app = $stmt->fetch();
        
        if (!$app) {
            http_response_code(404);
            echo json_encode(['error' => 'App not found']);
            exit;
        }
        
        // Find the uploaded file
        $uploadDir = '../uploads/';
        $pattern = $uploadDir . $scan_id . '-*';
        $files = glob($pattern);
        
        if (empty($files)) {
            http_response_code(404);
            echo json_encode(['error' => 'Uploaded file not found']);
            exit;
        }
        
        $filePath = $files[0];
        $extractDir = $uploadDir . 'extracted_' . $scan_id;
        
        // Create extraction directory
        if (!is_dir($extractDir)) {
            mkdir($extractDir, 0777, true);
        }
        
        // Handle different file types
        $fileExtension = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
        
        if ($fileExtension === 'zip') {
            // Extract ZIP file
            $zip = new ZipArchive;
            if ($zip->open($filePath) === TRUE) {
                $zip->extractTo($extractDir);
                $zip->close();
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to extract ZIP file']);
                exit;
            }
        } else {
            // For non-zip files, copy to extraction directory
            copy($filePath, $extractDir . '/' . basename($filePath));
        }
        
        // Run Python scanner
        $scannerPath = realpath(__DIR__ . '/../../scanner/scan_app.py');
        $command = "python3 '$scannerPath' '$extractDir' 2>&1";
        $output = shell_exec($command);
        $result = json_decode($output, true);
        
        if (!$result) {
            // If JSON decode fails, create a basic result
            $result = [
                'bugs_found' => 0,
                'security_issues' => 0,
                'performance_score' => 75,
                'issues' => ['Scanner output: ' . $output]
            ];
        }
        
        // Update app status and save results
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
        
        // Clean up extraction directory
        shell_exec("rm -rf '$extractDir'");
        
        echo json_encode(['success' => true, 'result' => $result, 'scan_id' => $scan_id]);
        
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Missing scan_id parameter']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>