<?php

$dbHost = $_ENV['DB_HOST'];
$dbUser = $_ENV['DB_USER'];
$dbPassword = $_ENV['DB_PASSWORD'];
$dbName = $_ENV['DB_NAME'];

$host = $dbHost;
$database = $dbName;
$username = $dbUser;
$password = $dbPassword;

// $host = 'localhost:3307';
// $database = 'mazad';
// $username = 'root';
// $password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // echo "Connected successfully";
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Store the PDO object in the $GLOBALS array to make it global
$GLOBALS['pdo'] = $pdo;
