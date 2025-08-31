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
    $user_id = $_SESSION['user_id'];
    
    // Get total scans run
    $stmt = $pdo->prepare("SELECT COUNT(*) as total_scans FROM apps WHERE user_id = ? AND status = 'completed'");
    $stmt->execute([$user_id]);
    $total_scans = $stmt->fetch()['total_scans'];
    
    // Get total bugs found
    $stmt = $pdo->prepare("
        SELECT COALESCE(SUM(sr.bugs_found), 0) as total_bugs 
        FROM apps a 
        LEFT JOIN scan_results sr ON a.id = sr.app_id 
        WHERE a.user_id = ?
    ");
    $stmt->execute([$user_id]);
    $total_bugs = $stmt->fetch()['total_bugs'];
    
    // Get passed apps (performance score >= 80)
    $stmt = $pdo->prepare("
        SELECT COUNT(*) as passed_apps 
        FROM apps a 
        LEFT JOIN scan_results sr ON a.id = sr.app_id 
        WHERE a.user_id = ? AND sr.performance_score >= 80
    ");
    $stmt->execute([$user_id]);
    $passed_apps = $stmt->fetch()['passed_apps'];
    
    // Get recent activity
    $stmt = $pdo->prepare("
        SELECT 
            a.name,
            a.status,
            a.last_scan,
            sr.performance_score
        FROM apps a
        LEFT JOIN scan_results sr ON a.id = sr.app_id
        WHERE a.user_id = ?
        ORDER BY a.last_scan DESC
        LIMIT 5
    ");
    $stmt->execute([$user_id]);
    $recent_activity = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'stats' => [
            'total_scans' => (int)$total_scans,
            'total_bugs' => (int)$total_bugs,
            'passed_apps' => (int)$passed_apps,
            'recent_activity' => $recent_activity
        ]
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error', 'details' => $e->getMessage()]);
}
?>