<?php

function hashPassword($password)
{
    return password_hash($password, PASSWORD_DEFAULT);
}

function verifyPassword($userInputPassword, $hashedPasswordFromDatabase)
{
    return password_verify($userInputPassword, $hashedPasswordFromDatabase);
}
