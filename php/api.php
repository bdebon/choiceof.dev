<?php
require_once '../../config.php';
require_once 'turnstile.php';

if (isset($_SERVER['HTTP_ORIGIN']))
  header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
header('Access-Control-Allow-Methods: GET, POST');

$token = $_POST['token'] ?? null;
if (is_null($token)) {
  http_response_code(400);
  echo 'no-token';
  return;
}

$validationResult = validateToken($token, $config['CLOUDFLARE_TURNSTILE_SECRET']);
if (is_null($validationResult)) {
  http_response_code(400);
  echo 'invalid-token';
  return;
}


$pdo = new PDO("mysql:dbname=" . $config['DB_NAME'] . ";host=" . $config['DB_HOST'], $config['DB_USER'], $config['DB_PASSWORD']);
$method = $_SERVER['REQUEST_METHOD'];
$slug = $_GET['slug'] ?? null;
$dispatchCountOn = 50;
$ip = $_SERVER["REMOTE_ADDR"];

if ($slug === null) {
  die;
}

if ($method === 'GET') {
  $query = $pdo->prepare('SELECT SUM(count) as count, position FROM votes WHERE slug = ? GROUP BY position');
  $query->execute([$slug]);
  $result = $query->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode($result);
  return;
}

if ($method === 'POST') {
  $position = $_POST['position'] ?? null;

  if ($position === null) {
    die;
  }

  $hashedIp = sha1($ip);
  $query = $pdo->prepare('SELECT * FROM logs WHERE ip = ?');
  $query->execute([$hashedIp]);

  $result = $query->fetch(PDO::FETCH_ASSOC);

  if ($result === false) {
    $query = $pdo->prepare('INSERT INTO logs (ip, slugs) VALUES (?, ?);');
    $query->execute([$hashedIp, json_encode([$slug])]);

    insertVote($pdo, $slug, $position, $dispatchCountOn);
    return;
  }

  $alreadyVotedFor = json_decode($result['slugs'], true);
  $found = in_array($slug, $alreadyVotedFor);

  if (!$found) {
    array_push($alreadyVotedFor, $slug);

    insertVote($pdo, $slug, $position, $dispatchCountOn);
    $query = $pdo->prepare('UPDATE logs SET slugs = ? WHERE ip = ?;');
    $query->execute([
      json_encode($alreadyVotedFor),
      $hashedIp
    ]);
  }

  return;
}

function insertVote(PDO $pdo, string $slug, int $position, int $dispatchCountOn)
{
  $query = $pdo->prepare('INSERT INTO votes (slug, slot, count, position) VALUES (?, RAND() * '. $dispatchCountOn .', 1, ?) ON DUPLICATE KEY UPDATE count = count + 1;');
  $query->execute([$slug, $position]);
}
