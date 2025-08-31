<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
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

include '../db.php';

try {
    // Get user's apps with their latest scan results
    $stmt = $pdo->prepare("
        SELECT 
            a.id,
            a.name,
            a.repo_url,
            a.scan_id,
            a.status,
            a.last_scan,
            sr.bugs_found,
            sr.performance_score,
            sr.security_issues,
            sr.generated_at
        FROM apps a
        LEFT JOIN scan_results sr ON a.id = sr.app_id
        WHERE a.user_id = ?
        ORDER BY a.last_scan DESC
    ");
    
    $stmt->execute([$_SESSION['user_id']]);
    $apps = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Format the response
    $formatted_apps = [];
    foreach ($apps as $app) {
        $formatted_apps[] = [
            'id' => $app['id'],
            'name' => $app['name'] ?: 'Unnamed App',
            'repo_url' => $app['repo_url'],
            'scan_id' => $app['scan_id'],
            'status' => $app['status'],
            'last_scan' => $app['last_scan'],
            'certification' => ($app['performance_score'] >= 80) ? 'Certified' : 'Not Certified',
            'bugs_found' => $app['bugs_found'] ?: 0,
            'performance_score' => $app['performance_score'] ?: 0,
            'security_issues' => $app['security_issues'] ?: 0
        ];
    }
    
    echo json_encode(['success' => true, 'apps' => $formatted_apps]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error', 'details' => $e->getMessage()]);
}
?>