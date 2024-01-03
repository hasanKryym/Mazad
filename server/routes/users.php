<?php
// routes/users.php

require_once 'controllers/UsersController.php';

$usersController = new UsersController();

if (!auth()) {
    $unauthorizedError = new UnauthorizedError('');
    $unauthorizedError->handle();
    return;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($route)) {
        if ($route === '/users/getById') {
            $usersController->getUserById();
        } else {
            $notFoundError = new NotFoundError('Route not found');
            $notFoundError->handle();
        }
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $notFoundError = new NotFoundError('Route not found');
    $notFoundError->handle();
} else {
    $badRequestError = new BadRequestError('Route not found');
    $badRequestError->handle();
}
