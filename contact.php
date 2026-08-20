<?php
header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['success'=>false,'message'=>'Method not allowed.']); exit; }
$configPath = __DIR__ . '/config/config.js';
$raw = @file_get_contents($configPath);
if ($raw === false || !preg_match('/window\.siteConfigData\s*=\s*(\{.*\})\s*;?\s*$/s', $raw, $matches)) { http_response_code(500); echo json_encode(['success'=>false,'message'=>'Configuration unavailable.']); exit; }
$config = json_decode($matches[1], true);
$recipient = $config['email'] ?? '';
if (!filter_var($recipient, FILTER_VALIDATE_EMAIL)) { http_response_code(500); echo json_encode(['success'=>false,'message'=>'Recipient configuration is invalid.']); exit; }
if (!empty($_POST['company'] ?? '')) { echo json_encode(['success'=>true]); exit; }
$name = trim(strip_tags($_POST['fullName'] ?? ''));
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$service = trim(strip_tags($_POST['service'] ?? ''));
$property = trim(strip_tags($_POST['propertyType'] ?? ''));
$message = trim(strip_tags($_POST['message'] ?? ''));
if (mb_strlen($name) < 2 || !filter_var($email, FILTER_VALIDATE_EMAIL) || !$service || !$property || mb_strlen($message) < 5) { http_response_code(422); echo json_encode(['success'=>false,'message'=>'Please complete all required fields.']); exit; }
$siteName = trim($config['siteName'] ?? 'Website');
$subject = $siteName . ' request: ' . substr($service, 0, 90);
$body = "Name: $name\nEmail: $email\nService/Pest Issue: $service\nProperty Type: $property\n\nMessage:\n$message";
$headers = "From: " . $recipient . "\r\nReply-To: " . $email . "\r\nContent-Type: text/plain; charset=UTF-8";
$sent = @mail($recipient, $subject, $body, $headers);
if (!$sent) { http_response_code(500); echo json_encode(['success'=>false,'message'=>'We could not send your request at this time.']); exit; }
echo json_encode(['success'=>true]);
