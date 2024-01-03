<?php
class BadRequestError extends BaseError
{
    public function __construct($message)
    {
        parent::__construct(HttpStatusCodes::BAD_REQUEST, $message ? $message : HttpStatusCodes::getMessage(HttpStatusCodes::BAD_REQUEST));
    }
}

// $badRequestError = new BadRequestError('');
// $badRequestError->handle();