<?php
class HttpStatusCodes
{
    const OK = 200;
    const CREATED = 201;
    const NO_CONTENT = 204;
    const BAD_REQUEST = 400;
    const UNAUTHORIZED = 401;
    const FORBIDDEN = 403;
    const NOT_FOUND = 404;
    const INTERNAL_SERVER_ERROR = 500;

    // Add more status codes and messages as needed

    public static function getMessage($statusCode)
    {
        $statusMessages = array(
            self::OK => 'OK',
            self::CREATED => 'Created',
            self::NO_CONTENT => 'No Content',
            self::BAD_REQUEST => 'Bad Request: The request is invalid or incomplete',
            self::UNAUTHORIZED => 'Unauthorized: Access to this resource is not allowed',
            self::FORBIDDEN => 'Forbidden',
            self::NOT_FOUND => 'Not Found: The requested page or resource does not exist',
            self::INTERNAL_SERVER_ERROR => 'Internal Server Error: Something went wrong on the server',
            // Add more status codes and messages as needed
        );

        return isset($statusMessages[$statusCode]) ? $statusMessages[$statusCode] : '';
    }
}

// Usage example:
// $statusCode = HttpStatusCodes::OK;
// $statusMessage = HttpStatusCodes::getMessage($statusCode); // 'OK'