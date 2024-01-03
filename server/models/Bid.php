<?php

// models/Bid.php

// require_once 'errors/index.php';

class Bid
{


    public function getBidById($id)
    {
        global $pdo;

        try {
            $stmt = $pdo->prepare('SELECT * FROM bids WHERE id = :id');
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            // Fetch the bid data
            $bid = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($bid) {
                return $bid;
            } else {
                $notFoundError = new NotFoundError('No bid found with the specified ID.');
                $notFoundError->handle();
            }
        } catch (PDOException $e) {
            $databaseError = new DatabaseError('Error while retrieving the bid.');
            $databaseError->handle();
        }
    }


    public function addBid($bidData)
    {
        global $pdo;

        try {

            // check if the user already added a product with this specific id
            $checkSql = "SELECT userId FROM products WHERE id = :productId";
            $checkStmt = $pdo->prepare($checkSql);
            $checkStmt->bindParam(':productId', $bidData['productId']);
            $checkStmt->execute();
            $product = $checkStmt->fetch();

            if (!$product || $product['userId'] != $bidData['bidderId']) {
                // The product does not exist or does not belong to the user
                $notFoundError = new NotFoundError('No product with this specific id');
                $notFoundError->handle();
                return;
            }

            // Get the current date and time
            $currentDateTime = new DateTime();
            $created_at = $currentDateTime->format("Y-m-d H:i:s");

            // Parse the provided end_time
            $end_time = new DateTime($bidData['end_time']);

            // Check if end_time is in the future
            if ($end_time <= $currentDateTime) {
                // The end_time is not in the future, return an error response
                $badRequestError = new BadRequestError('End time must be in the future');
                $badRequestError->handle();
                return;
            }

            $sql = "INSERT INTO bids (productId, bidderId, min_bid, created_at, end_time) 
                VALUES (:productId, :bidderId, :min_bid, :created_at, :end_time)";

            $stmt = $pdo->prepare($sql);

            $end_time = $end_time->format("Y-m-d H:i:s");

            // Bind parameters
            $stmt->bindParam(':productId', $bidData['productId']);
            $stmt->bindParam(':bidderId', $bidData['bidderId']);
            $stmt->bindParam(':min_bid', $bidData['min_bid']);
            $stmt->bindParam(':created_at', $created_at);
            $stmt->bindParam(':end_time', $end_time);

            // Execute the query
            $stmt->execute();

            $bidId = $pdo->lastInsertId();

            $bid = $this->getBidById($bidId);

            http_response_code(HttpStatusCodes::CREATED);
            $response = array(
                'success' => true,
                'message' => 'Bid added successfully',
                'statusCode' => HttpStatusCodes::CREATED,
                'bid' => $bid
            );
            echo json_encode($response);
        } catch (PDOException $e) {
            $databaseError = new DatabaseError("Error while inserting the bid, " . $e->getMessage());
            $databaseError->handle();
        }
    }


    public function deleteBid($bidID)
    {
        global $pdo;
    }

    public function getUserBids($userId)
    {
        global $pdo;
        try {
            // Retrieve all bids for this specific user
            $sql = "SELECT * FROM bids WHERE bidderId = :userId";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':userId', $userId, PDO::PARAM_INT);
            $stmt->execute();

            // Fetch the bids
            $bids = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($bids) {
                http_response_code(HttpStatusCodes::OK);
                $response = array(
                    'success' => true,
                    'message' => 'Bids retrieved successfully',
                    'statusCode' => HttpStatusCodes::OK,
                    'bids' => $bids
                );
                echo json_encode($response);
            } else {
                $notFoundError = new NotFoundError('No bids found for this users.');
                $notFoundError->handle();
            }
        } catch (PDOException $e) {
            $databaseError = new DatabaseError('Error while retrieving bids.');
            $databaseError->handle();
        }
    }

    public function getBids($userId, $all, $search, $filter, $statusFilter)
    {
        global $pdo;

        try {
            // Retrieve all bids that are not added by the user and haven't ended
            $currentDateTime = date('Y-m-d H:i:s');
            if ($all === 'true') $sql = "SELECT * FROM bids WHERE bidderId != :userId";
            else $sql = "SELECT * FROM bids WHERE bidderId = :userId";

            if ($statusFilter === 'won') $filter = 'ended'; // in order to get the ended bids only

            if ($filter === 'present') $sql .= " AND end_time > :currentDateTime";
            if ($filter === 'ended') $sql .= " AND end_time < :currentDateTime";

            // if ($statusFilter === 'won') {
            //     $sql .= " AND id IN (
            //     SELECT bidId
            //     FROM user_bids
            //     WHERE userId = :userId
            //       AND bidId IN (
            //           SELECT id
            //           FROM bids
            //           WHERE bidderId != :userId
            //             AND end_time < :currentDateTime
            //       )
            //       AND bidAmount IN (
            //           SELECT MAX(bidAmount)
            //           FROM user_bids
            //           WHERE userId = :userId
            //             AND bidId IN (
            //                 SELECT id
            //                 FROM bids
            //                 WHERE bidderId != :userId
            //                   AND end_time < :currentDateTime
            //             )
            //           GROUP BY bidId
            //       )
            // )";
            // }

            if ($statusFilter === 'won') {
                // For 'won' status, retrieve ended bids where the user has the highest bid compared to all users
                $sql .= " AND end_time < :currentDateTime AND id IN (
                SELECT bidId
                FROM user_bids u1
                WHERE userId = :userId
                  AND bidId IN (
                      SELECT id
                      FROM bids
                      WHERE bidderId != :userId
                        AND end_time < :currentDateTime
                  )
                  AND NOT EXISTS (
                      SELECT 1
                      FROM user_bids u2
                      WHERE u2.bidId = u1.bidId
                        AND u2.userId != :userId
                        AND u2.bidAmount > u1.bidAmount
                  )
            )";
            }

            if ($statusFilter === 'participated') {
                $sql .= " AND id IN (SELECT bidId FROM user_bids WHERE userId = :userId)";
            }

            if ($search) $sql .= " AND productId IN (SELECT id FROM products WHERE name LIKE :search OR description LIKE :search)";

            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':userId', $userId, PDO::PARAM_INT);
            if ($filter === 'present' || $filter === 'ended') $stmt->bindParam(':currentDateTime', $currentDateTime);

            if ($search) $stmt->bindValue(':search', '%' . $search . '%', PDO::PARAM_STR);

            $stmt->execute();

            // Fetch the bids
            $bids = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($bids) {
                http_response_code(HttpStatusCodes::OK);
                $response = array(
                    'success' => true,
                    'message' => 'Bids retrieved successfully',
                    'statusCode' => HttpStatusCodes::OK,
                    'bids' => $bids
                );
                echo json_encode($response);
            } else {
                $notFoundError = new NotFoundError('No bids found.');
                $notFoundError->handle();
            }
        } catch (PDOException $e) {
            $databaseError = new DatabaseError('Error while retrieving bids.');
            $databaseError->handle();
        }
    }

    public function getUserBidByBidIdAndUserId($bidId, $userId)
    {
        global $pdo;

        try {
            $sql = "SELECT * FROM user_bids WHERE bidId = :bidId AND userId = :userId";
            $stmt = $pdo->prepare($sql);

            $stmt->bindParam(':bidId', $bidId);
            $stmt->bindParam(':userId', $userId);

            $stmt->execute();

            $userBid = $stmt->fetch(PDO::FETCH_ASSOC);

            return $userBid;
        } catch (PDOException $e) {
            $databaseError = new DatabaseError('Error while retrieving userBid.');
            $databaseError->handle();
            return null;
        }
    }


    public function placeBid($bidData)
    {
        global $pdo;

        try {
            // Retrieve the bid information by bid ID
            $bid = $this->getBidById($bidData['bidId']);

            if (!$bid) return;

            // Check if the bid end time is in the future
            $currentDateTime = new DateTime();
            $bidEndTime = new DateTime($bid['end_time']);

            if ($bidEndTime <= $currentDateTime) {
                $badRequestError = new BadRequestError('Bid has ended');
                $badRequestError->handle();
                return;
            }

            // Retrieve the highest bid amount for the specific Bid
            $highestBid = $this->getHighestBidForItem($bidData['bidId'], false);

            // If there is a highest bid, compare with the new bid amount
            if ($highestBid !== null && $bidData['bidAmount'] <= $highestBid) {
                // Return an error response indicating that the bid must be higher than the highest bid
                $badRequestError = new BadRequestError('Your bid must be higher than the highest bid which is $' . $highestBid);
                $badRequestError->handle();
                return;
            }

            // Check if the user has an existing bid on the same item
            $existingBid = $this->getUserBidByBidIdAndUserId($bidData['bidId'], $bidData['userId']);

            if ($existingBid) {
                // Compare the new bidAmount with the existing bid
                if ($bidData['bidAmount'] > $existingBid['bidAmount']) {
                    // Update the existing bid with the new bidAmount
                    $sql = "UPDATE user_bids SET bidAmount = :bidAmount WHERE bidId = :bidId AND userId = :userId";
                    $stmt = $pdo->prepare($sql);

                    $stmt->bindParam(':bidId', $bidData['bidId']);
                    $stmt->bindParam(':userId', $bidData['userId']);
                    $stmt->bindParam(':bidAmount', $bidData['bidAmount']);

                    // Execute the query to update the bid
                    $stmt->execute();

                    // Return a success response
                    http_response_code(HttpStatusCodes::OK);
                    $response = array(
                        'success' => true,
                        'message' => 'Bid Updated successfully',
                        'statusCode' => HttpStatusCodes::OK,
                        // 'bid' => $placedBid
                    );
                    echo json_encode($response);
                } else {
                    // Return an error response indicating that the bid must be higher
                    $badRequestError = new BadRequestError('Your bid must be higher than the existing bid');
                    $badRequestError->handle();
                    return;
                }
            } else {
                // Insert a new bid as in your existing code
                // Insert the bid into the user_bids table
                $sql = "INSERT INTO user_bids (bidId, userId, bidAmount) VALUES (:bidId, :bidderId, :bidAmount)";
                $stmt = $pdo->prepare($sql);

                $stmt->bindParam(':bidId', $bidData['bidId']);
                $stmt->bindParam(':bidderId', $bidData['userId']);
                $stmt->bindParam(':bidAmount', $bidData['bidAmount']);

                // Execute the query
                $stmt->execute();

                // Retrieve the newly placed bid
                // $bidId = $pdo->lastInsertId();
                // $placedBid = $this->getUserBidById($bidId);

                // Return a success response
                http_response_code(HttpStatusCodes::CREATED);
                $response = array(
                    'success' => true,
                    'message' => 'Bid placed successfully',
                    'statusCode' => HttpStatusCodes::CREATED,
                    // 'bid' => $placedBid
                );
                echo json_encode($response);
            }
        } catch (PDOException $e) {
            $databaseError = new DatabaseError("Error while placing the bid, " . $e->getMessage());
            $databaseError->handle();
        }
    }

    public function getHighestBidForItem($bidId, $getUser) // get the highest bidAmount for a specific bid
    {
        global $pdo;

        try {
            // Retrieve the highest bid for the specified item
            $sql = "SELECT MAX(bidAmount) AS highestBid FROM user_bids WHERE bidId = :bidId";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':bidId', $bidId);
            $stmt->execute();

            // Fetch the result
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($getUser) {
                $sql = "SELECT userId FROM user_bids WHERE bidAmount = :highestBid";
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':highestBid', $result['highestBid']);
                $stmt->execute();
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                $response = array(
                    'userId' => ($user && isset($user['userId'])) ? $user['userId'] : null,
                    'highestBid' => ($result && isset($result['highestBid'])) ? $result['highestBid'] : null,
                );

                return $response;
            }

            // Return the highest bid or null if no bids exist
            return ($result && isset($result['highestBid'])) ? $result['highestBid'] : null;
        } catch (PDOException $e) {
            // Handle database error
            $databaseError = new DatabaseError("Error while retrieving the highest bid: " . $e->getMessage());
            $databaseError->handle();
            return null;
        }
    }
}
