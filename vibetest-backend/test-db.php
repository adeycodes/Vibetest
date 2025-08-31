<?php
header("Content-Type: application/json");
require_once 'db.php';
echo json_encode(['status' => 'ok', 'message' => 'Backend is alive!']);
?>