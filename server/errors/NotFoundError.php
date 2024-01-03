<?php
class NotFoundError extends BaseError
{
    public function __construct($message)
    {
        // parent::__construct(HttpStatusCodes::NOT_FOUND, HttpStatusCodes::getMessage(HttpStatusCodes::NOT_FOUND));
        parent::__construct(HttpStatusCodes::NOT_FOUND, $message ? $message : HttpStatusCodes::getMessage(HttpStatusCodes::NOT_FOUND));
    }
}

// $notFoundError = new NotFoundError('');
// $notFoundError->handle();