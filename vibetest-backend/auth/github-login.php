<?php
$client_id = 'Ov23liOA1wfYcD1dJKTH';
$redirect_uri = 'http://localhost:8000/auth/github-callback.php';
$url = "https://github.com/login/oauth/authorize?client_id=$client_id&redirect_uri=$redirect_uri&scope=user:email";
header("Location: $url");
?>