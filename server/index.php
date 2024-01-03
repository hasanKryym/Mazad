<?php
// Enable CORS for all origins
header("Access-Control-Allow-Origin: *");

// Allow the headers that include Authorization
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");

// Allow methods (e.g., POST, GET) from the client side
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");


// Set the content type to JSON
header('Content-Type: application/json');

// Handle CORS preflight request globally
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header('Content-Type: application/json');
    exit();
}

// Capture the requested route from the URL using PATH_INFO or set it to an empty string
$route = $_SERVER['PATH_INFO'] ?? '';
$routeParts = explode('/', trim($route, '/'));
$firstRoutePart = $routeParts[0];

// require dotenv file
require 'vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();


// In order to accept json data
$_POST = json_decode(file_get_contents('php://input'), true);

require_once 'config/database.php';

require_once 'errors/index.php';

require_once 'middleware/authMiddleware.php';

switch ($firstRoutePart) {
    case 'authentication':
        require_once 'routes/authentication.php';
        break;

    case 'users':
        require_once 'routes/users.php';
        break;

    case 'products':
        require_once 'routes/products.php';
        break;

    case 'bids':
        require_once 'routes/bids.php';
        break;

    default:
        $notFoundError = new NotFoundError('Route not found');
        $notFoundError->handle();
}
