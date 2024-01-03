<?php

function checkAuth()
{
    if (!isset($_SESSION['userId'])) {
        $unauthorizedError = new UnauthorizedError('');
        $unauthorizedError->handle();
        return false;
    } else return true;
}
