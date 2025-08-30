<?php
$score = (int)($_GET['score'] ?? 50);
$color = $score > 80 ? '4ade80' : ($score > 50 ? 'facc15' : 'ef4444');

$im = imagecreate(120, 40);
$bg = imagecolorallocate($im, 255, 255, 255);
$text = imagecolorallocate($im, 0, 0, 0);
$fg = imagecolorallocate($im, hexdec(substr($color, 0, 2)), hexdec(substr($color, 2, 2)), hexdec(substr($color, 4, 2)));

imagefilledrectangle($im, 0, 0, 119, 39, $bg);
imagefilledrectangle($im, 0, 0, 60, 39, $fg);
imagestring($im, 5, 5, 12, 'Vibe', $bg);
imagestring($im, 5, 65, 12, number_format($score), $text);

header('Content-Type: image/png');
imagepng($im);
imagedestroy($im);
?>