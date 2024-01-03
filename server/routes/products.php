<?php
// routes/products.php

require_once 'controllers/ProductsController.php';



$productsController = new ProductsController();

if (!auth()) {
    $unauthorizedError = new UnauthorizedError('');
    $unauthorizedError->handle();
    return;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($route)) {
        if ($route === '/products/manage/add') $productsController->addProduct();
        else {
            $notFoundError = new NotFoundError('');
            $notFoundError->handle();
        }
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (preg_match('/\/products\/(\d+)/', $route, $matches)) {
        $id = $matches[1]; // This will capture the 'id' from the URL.        
        $productsController->getProductById($id);
    } else if ($route === '/products/user/get') {
        $productsController->getUserProducts();
    } else {
        $notFoundError = new NotFoundError('');
        $notFoundError->handle();
    }
} else {
    $badRequestError = new BadRequestError('Route not found');
    $badRequestError->handle();
}
