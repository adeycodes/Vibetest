// vibetest-backend/email/report.php
use PHPMailer\PHPMailer\PHPMailer;

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'you@gmail.com';
$mail->Password = 'app-password';
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

$mail->setFrom('hello@vibetest.com', 'VibeTest');
$mail->addAddress($userEmail);
$mail->isHTML(true);
$mail->Subject = "Your App Scan Report";
$mail->Body = "<h2>Scan Complete!</h2><p>Score: {$score}/100</p><img src='http://localhost:8000/badge.php?score=$score' />";
$mail->send();