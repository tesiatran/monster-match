<?php

require_once('functions.php');
set_exception_handler('error_handler');
require_once('db_connection.php');

$body = file_get_contents('php://input');
$object = json_decode($body);
$result = (array) $object;

$name = $result['name'];
$attempts = $result['attempts'];
$accuracy = $result['accuracy'];



?>
