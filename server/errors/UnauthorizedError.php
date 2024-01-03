<?php
class UnauthorizedError extends BaseError
{
    public function __construct($message)
    {
        parent::__construct(HttpStatusCodes::UNAUTHORIZED, $message ? $message : HttpStatusCodes::getMessage(HttpStatusCodes::UNAUTHORIZED));
    }
}


// $unauthorizedError = new UnauthorizedError('');
// $unauthorizedError->handle();