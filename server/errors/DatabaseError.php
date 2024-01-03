<?php
class DatabaseError extends BaseError
{
    public function __construct($message)
    {
        parent::__construct(HttpStatusCodes::INTERNAL_SERVER_ERROR, $message ? $message : "Database error");
    }
}

// $databaseError = new DatabaseError('');
// $databaseError->handle();