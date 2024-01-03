<?php
require_once 'models/User.php';

require_once 'utils/checkAuth.php';

class UsersController
{
    public function getUserById()
    {
        if (!checkAuth()) return;
        $userId = $_POST['userId'];
        if (!$userId) {
            $badRequestError = new BadRequestError('please provide userId in the body');
            $badRequestError->handle();
            return;
        }

        $userModel = new User();

        $user = $userModel->getUserById($userId);
        if ($user) {
            http_response_code(HttpStatusCodes::OK);
            $response = array(
                'success' => true,
                'message' => 'User retrieved successfully',
                'statusCode' => HttpStatusCodes::OK,
                'user' => $user
            );
            echo json_encode($response);
        }
    }
}
