<?php
// routes/authentication.php

require_once 'controllers/AuthController.php';

$authController = new AuthController();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($route)) {
        if ($route === '/authentication/signup') $authController->signup();
        else if ($route === '/authentication/login') $authController->login();
        else {
            $notFoundError = new NotFoundError('Route not found');
            $notFoundError->handle();
        }
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($route === '/authentication') {
        $authController->authenticate();
    } else {
        $notFoundError = new NotFoundError('Route not found');
        $notFoundError->handle();
    }
} else {
    $badRequestError = new BadRequestError('Route not found');
    $badRequestError->handle();
}
