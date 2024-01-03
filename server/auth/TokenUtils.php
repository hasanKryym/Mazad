<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function generateToken($userId)
{
    $key = $_ENV['SECRET_KEY'];
    $tokenPayload = array(
        "userId" => $userId,
        "exp" => time() + 31536000 // Token expiration time (1 year)
    );

    $token = JWT::encode($tokenPayload, $key, 'HS256');
    return $token;
}

function validateToken($token)
{
    $key = $_ENV['SECRET_KEY'];

    try {
        $decoded = JWT::decode($token, new Key($key, 'HS256'));
        // The token is valid
        return $decoded;
    } catch (Exception $e) {
        // The token is invalid
        return false;
    }
}
