<?php
class InternalServerError extends BaseError
{
    public function __construct($message)
    {
        parent::__construct(HttpStatusCodes::INTERNAL_SERVER_ERROR, $message ? $message : HttpStatusCodes::getMessage(HttpStatusCodes::INTERNAL_SERVER_ERROR));
    }
}

// $internalServerError = new InternalServerError('');
// $internalServerError->handle();