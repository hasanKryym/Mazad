<?php

require_once 'models/Product.php';

require_once 'utils/checkAuth.php';

class ProductsController
{

    public function addProduct()
    {
        if (!checkAuth()) return;

        $userId = $_SESSION['userId'];
        if (!$userId || !isset($_POST['name']) || !$_POST['name'] || !isset($_POST['description']) || !$_POST['description'] || !isset($_POST['image']) || !$_POST['image']) {
            $badRequestError = new BadRequestError('please provide userId, product name, description, and the image url');
            $badRequestError->handle();
            return;
        }

        $productModel = new Product();

        $productData = array(
            'userId' => $userId,
            'name' => $_POST['name'],
            'description' => $_POST['description'],
            'image' => $_POST['image']
        );

        $productModel->addProduct($productData);
    }

    public function getUserProducts()
    {
        if (!checkAuth()) return;

        $userId = $_SESSION['userId'];
        if (!$userId) {
            $unauthorizedError = new UnauthorizedError('');
            $unauthorizedError->handle();
            return;
        }

        $search = isset($_GET['search']) ? $_GET['search'] : '';

        $productModel = new Product();

        $productModel->getUserProducts($userId, $search);
    }

    public function getProductById($productId)
    {
        if (!checkAuth()) return;

        $productModel = new Product();
        $product = $productModel->getProductById($productId);

        if (!$product) return;

        http_response_code(HttpStatusCodes::OK);
        $response = array(
            'success' => true,
            'message' => 'product retrieved successfully',
            'statusCode' => HttpStatusCodes::OK,
            'product' => $product
        );
        echo json_encode($response);
    }
}
