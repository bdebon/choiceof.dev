<?php
function validateToken($token, $secretKey)
{
  $stream = stream_context_create([
    'http' => [
      'method' => 'POST',
      'header' => 'Content-type: application/x-www-form-urlencoded',
      'content' => http_build_query(['secret' => $secretKey, 'response' => $token])]
  ]);

  $result = file_get_contents(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    false,
    $stream);

  if ($result === false) {
    return null;
  }

  return json_decode($result, true);
}
