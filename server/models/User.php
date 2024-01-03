<?php

// models/User.php

require_once 'errors/index.php';
require_once 'utils/passwordUtils.php';
require_once 'auth/TokenUtils.php';

class User
{
    public function getUserById($userId)
    {
        global $pdo;

        try {
            $stmt = $pdo->prepare('SELECT id, username, email, address, phoneNumber FROM users WHERE id = :id');
            $stmt->bindParam(':id', $userId, PDO::PARAM_INT);
            $stmt->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user) {
                $notFoundError = new NotFoundError('User not found');
                $notFoundError->handle();
                return;
            }
            return $user;
        } catch (PDOException $e) {
            $databaseError = new DatabaseError('Error while fetching User data' . $e->getMessage());
            $databaseError->handle();
            return null;
        }
    }

    public function getUserByEmail($email)
    {
        global $pdo;

        try {
            $stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
            $stmt->bindParam(':email', $email);
            $stmt->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$user) {
                $notFoundError = new NotFoundError('Email does not exist');
                $notFoundError->handle();
                return;
            }
            return $user;
        } catch (PDOException $e) {
            $databaseError = new DatabaseError('Error while fetching User data' . $e->getMessage());
            $databaseError->handle();
            return null;
        }
    }

    public function verifyPassword($plainPassword, $hashedPassword)
    {
        return password_verify($plainPassword, $hashedPassword);
    }


    public function login($userData)
    {
        $email = $userData['email'];
        $password = $userData['password'];

        $user = $this->getUserByEmail($email);
        if (!$user) return;

        if ($this->verifyPassword($password, $user['password'])) {
            // Correct password
            unset($user['password']);
            $response = array(
                'success' => true,
                'message' => 'Login successful',
                'statusCode' => HttpStatusCodes::OK,
                'user' => $user,
                'token' => generateToken($user['id'])
            );
            echo json_encode($response);
        } else {
            // Incorrect password
            $unauthorizedError = new UnauthorizedError('Invalid email-password combination');
            $unauthorizedError->handle();
        }
    }


    public function createUser($userData)
    {
        global $pdo;

        try {
            if ($this->emailExists($userData['email'])) {
                $badRequestError = new BadRequestError('Email already exists');
                $badRequestError->handle();
                return;
            }

            $hashedPassword = hashPassword($userData['password']);
            $stmt = $pdo->prepare('INSERT INTO users (username, email, password, address, phoneNumber) VALUES (:username, :email, :password, :address, :phoneNumber)');
            $stmt->execute([
                ':username' => $userData['username'],
                ':email' => $userData['email'],
                ':password' => $hashedPassword,
                ':address' => $userData['address'],
                ':phoneNumber' => $userData['phoneNumber']
            ]);
            http_response_code(HttpStatusCodes::CREATED);
            $userId = $pdo->lastInsertId(); // the ID of the newly created user
            $user = $this->getUserById($userId);
            unset($user['password']);
            $response = array(
                'success' => true,
                'message' => 'User created successfully',
                'statusCode' => HttpStatusCodes::CREATED,
                'user' => $user,
                'token' => generateToken($userId),
            );
            echo json_encode($response);
        } catch (PDOException $e) {
            $databaseError = new DatabaseError("error while creating the user" . $e->getMessage());
            $databaseError->handle();
            return null;
        }
    }

    public function emailExists($email)
    {
        global $pdo; // Access the global PDO instance

        try {
            $stmt = $pdo->prepare('SELECT COUNT(*) FROM users WHERE email = :email');
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            $count = $stmt->fetchColumn();

            return $count > 0;
        } catch (PDOException $e) {
            $databaseError = new DatabaseError('Error while checking for email existance' . $e->getMessage());
            $databaseError->handle();
            return false; // Assume the email doesn't exist on error
        }
    }
}
