<?php

require_once 'auth/TokenUtils.php';

function auth()
{
    $headers = getallheaders();

    if (isset($headers['Authorization'])) {
        $authHeader = $headers['Authorization'];
        if (str_starts_with($authHeader, 'Bearer ')) {
            // Extract the token
            $token = substr($authHeader, 7); // Removes "Bearer " prefix
            $payload = validateToken($token);
            if ($payload) {
                $_SESSION['userId'] = $payload->userId;
                return true;
            } else return false;
        }
    } else {
        return false;
    }
}
