<?php
// controllers/AuthController.php

require_once 'models/User.php';

class AuthController
{
    public function login()
    {
        if (!isset($_POST['email']) || !$_POST['email'] || !isset($_POST['password']) || !$_POST['password']) {
            $badRequestError = new BadRequestError('Please provide email and password');
            $badRequestError->handle();
            return;
        }

        $userModel = new User();

        $userData = [
            'email' => $_POST['email'],
            'password' => $_POST['password'],
        ];

        $userModel->login($userData);
    }

    public function signup()
    {

        if (!isset($_POST['username']) || !$_POST['username'] || !isset($_POST['email']) || !$_POST['email'] || !isset($_POST['password']) || !$_POST['password'] || !isset($_POST['address']) || !$_POST['address'] || !isset($_POST['phoneNumber']) || !$_POST['phoneNumber']) {
            $badRequestError = new BadRequestError('Please provide username, email, password, address, and phoneNumber');
            $badRequestError->handle();
            return;
        }

        $userModel = new User();

        $userData = [
            'username' => $_POST['username'],
            'email' => $_POST['email'],
            'password' => $_POST['password'],
            'address' => $_POST['address'],
            'phoneNumber' => $_POST['phoneNumber']
        ];

        $userModel->createUser($userData);
    }
    public function authenticate()
    {
        $success = false;
        $message = 'Authentication failed';
        $statusCode = HttpStatusCodes::FORBIDDEN;
        if (auth()) {
            $success = true;
            $message = 'User is authenticated';
            $statusCode = HttpStatusCodes::OK;
        }

        $response = array(
            'success' => $success,
            'message' => $message,
            'statusCode' => $statusCode,
        );
        echo json_encode($response);
    }
}
