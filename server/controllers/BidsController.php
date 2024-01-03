<?php
// controllers/BidsController.php

require_once 'models/Bid.php';
require_once 'utils/checkAuth.php';

class BidsController
{
    public function addBid()
    {
        if (!checkAuth()) return;
        $userId = $_SESSION['userId'];

        if (!$userId || !isset($_POST['productId']) || !$_POST['productId'] || !isset($_POST['min_bid']) || !$_POST['min_bid'] || !isset($_POST['end_time']) || !$_POST['end_time']) {
            $badRequestError = new BadRequestError('please provide productId, min_bid, created_at, and the end_time');
            $badRequestError->handle();
            return;
        }

        $bidModel = new Bid();

        $bidData = array(
            'productId' => $_POST['productId'],
            'bidderId' => $userId,
            'min_bid' => $_POST['min_bid'],
            'end_time' => $_POST['end_time']
        );

        $bidModel->addBid($bidData);
    }

    public function getBids()
    {
        if (!checkAuth()) return;
        $userId = $_SESSION['userId'];

        $all = isset($_GET['all']) ? $_GET['all'] : '';
        $search = isset($_GET['search']) ? $_GET['search'] : '';
        $filter = isset($_GET['filter']) ? $_GET['filter'] : '';
        $statusFilter = isset($_GET['statusFilter']) ? $_GET['statusFilter'] : '';

        $bidModel = new Bid();

        $bidModel->getBids($userId, $all, $search, $filter, $statusFilter);
    }

    public function getUserBids()
    {
        if (!checkAuth()) return;
        $userId = $_SESSION['userId'];

        $bidModel = new Bid();

        $bidModel->getUserBids($userId);
    }

    public function placeBid()
    {
        if (!checkAuth()) return;
        $userId = $_SESSION['userId'];

        if (!$userId || !isset($_POST['bidId']) || !$_POST['bidId'] || !isset($_POST['bidAmount']) || !$_POST['bidAmount']) {
            $badRequestError = new BadRequestError('please provide bidId and bidAmount');
            $badRequestError->handle();
            return;
        }

        $bidModel = new Bid();

        $bidData = array(
            'userId' => $userId,
            'bidId' => $_POST['bidId'],
            'bidAmount' => $_POST['bidAmount']
        );

        $bidModel->placeBid($bidData);
    }

    public function getHighestBidForItem()
    {

        if (!checkAuth()) return;
        $userId = $_SESSION['userId'];

        if (!$userId || !isset($_POST['bidId']) || !$_POST['bidId']) {
            $badRequestError = new BadRequestError('please provide bidId');
            $badRequestError->handle();
            return;
        }

        $bidModel = new Bid();

        $data = $bidModel->getHighestBidForItem($_POST['bidId'], true);
        $highestBid = $data['highestBid'];
        $currentWinnerId = $data['userId'];
        http_response_code(HttpStatusCodes::OK);
        if (isset($highestBid)) {
            $response = array(
                'success' => true,
                'message' => 'highest bid retrieved successfully',
                'statusCode' => HttpStatusCodes::OK,
                'highestBid' => $highestBid,
                'userId' => $currentWinnerId
            );
        } else {
            $response = array(
                'success' => false,
                'message' => 'no bid with this specific ID',
                'statusCode' => HttpStatusCodes::NOT_FOUND,
                'highestBid' => $highestBid,
                'userId' => $currentWinnerId
            );
        }

        echo json_encode($response);
    }
}
