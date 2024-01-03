<?php

class Product
{

    public function getProductById($productId)
    {
        global $pdo;

        try {
            $sql = "SELECT * FROM products WHERE id = :productId";

            $stmt = $pdo->prepare($sql);

            $stmt->bindParam(':productId', $productId, PDO::PARAM_INT);
            $stmt->execute();

            // Fetch the product data
            $product = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$product) {
                $notFoundError = new NotFoundError('Product not found');
                $notFoundError->handle();
                return;
            }

            return $product;
        } catch (PDOException $e) {
            $databaseError = new DatabaseError('error fetching product data' . $e->getMessage());
            $databaseError->handle();
            return null;
        }
    }

    public function getUserProducts($userId, $search)
    {
        global $pdo;

        try {
            $sql = 'SELECT * FROM products WHERE userId = :userId';

            if ($search) {
                $sql .= ' AND (name LIKE :search OR description LIKE :search)';
            }

            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':userId', $userId, PDO::PARAM_INT);

            if ($search) {
                $searchParam = "%$search%";
                $stmt->bindParam(':search', $searchParam);
            }

            $stmt->execute();

            // Fetch the products for the given user
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($products) {
                http_response_code(HttpStatusCodes::OK);
                $response = array(
                    'success' => true,
                    'message' => 'User products retrieved successfully',
                    'statusCode' => HttpStatusCodes::OK,
                    'products' => $products
                );
                echo json_encode($response);
            } else {
                $notFoundError = new NotFoundError('No products found');
                $notFoundError->handle();
                return;
            }
        } catch (PDOException $e) {
            $databaseError = new DatabaseError('Error while retrieving user products');
            $databaseError->handle();
            return null;
        }
    }

    public function addProduct($productData)
    {
        global $pdo;

        try {
            $sql = "INSERT INTO products (userId, name, description, image) 
                    VALUES (:userId, :name, :description, :image)";

            $stmt = $pdo->prepare($sql);

            $stmt->bindParam(':userId', $productData['userId']);
            $stmt->bindParam(':name', $productData['name']);
            $stmt->bindParam(':description', $productData['description']);
            $stmt->bindParam(':image', $productData['image']);

            // Execute the query
            $stmt->execute();

            $productId = $pdo->lastInsertId();
            $product = $this->getProductById($productId);

            if (!$product) return;

            http_response_code(HttpStatusCodes::CREATED);
            $response = array(
                'success' => true,
                'message' => 'Product added successfully',
                'statusCode' => HttpStatusCodes::CREATED,
                'product' =>  $product
            );
            echo json_encode($response);
        } catch (PDOException $e) {
            $databaseError = new DatabaseError("error while inserting the product" . $e->getMessage());
            $databaseError->handle();
            return null;
        }
    }
}
