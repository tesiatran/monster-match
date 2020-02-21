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

$insertQuery = "INSERT INTO `highscore`
  (`name`, `attempts`, `accuracy`)
  VALUES (`$name`, `$attempts`, `$accuracy`)";

$insertResult = mysqli_query($conn, $insertQuery);

if(!$insertResult) {
  throw new Exception("Failed to add data to table " . $insertResult);
}

?>
