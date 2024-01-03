<?php
class BaseError
{
    protected $statusCode;
    protected $message;

    public function __construct($statusCode, $message)
    {
        $this->statusCode = $statusCode;
        $this->message = $message;
    }

    public function handle()
    {
        http_response_code($this->statusCode);
        $response = array(
            'success' => false,
            'message' => $this->message,
            'statusCode' => $this->statusCode
        );
        echo json_encode($response);
    }
}
