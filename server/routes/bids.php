<?php
// routes/authentication.php

require_once 'controllers/AuthController.php';

require_once 'controllers/BidsController.php';

if (!auth()) {
    $unauthorizedError = new UnauthorizedError('');
    $unauthorizedError->handle();
    return;
}

$bidController = new BidsController();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($route)) {
        if ($route === '/bids/manage/add') $bidController->addBid();
        else if ($route === '/bids/place') $bidController->placeBid();
        else if ($route === '/bids/getHighestBid') $bidController->getHighestBidForItem();
        else {
            $notFoundError = new NotFoundError('Route not found');
            $notFoundError->handle();
        }
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($route === '/bids') $bidController->getBids();
    else if ($route === '/bids/userBids') $bidController->getUserBids();
    else {
        $notFoundError = new NotFoundError('Route not found');
        $notFoundError->handle();
    }
} else {
    $badRequestError = new BadRequestError('Route not found');
    $badRequestError->handle();
}
