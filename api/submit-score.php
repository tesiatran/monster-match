<?php

require_once("functions.php");
set_exception_handler("error_handler");
require_once("db_connection.php");
startup();

$bodyData = getBodyData();

if ($bodyData["attempts"]) {
  $attempts = $bodyData["attempts"];
  if (gettype($attempts) !== "integer") {
    throw new Exception("Attempts must be a number");
  }
  if (intval($attempts) < 1) {
    throw new Exception("Attempts must be greater than 0");
  }
} else {
  throw new Exception("A value is required");
}

if ($bodyData["name"]) {
  $name = $bodyData["name"];
  if (gettype($name) !== "string") {
    throw new Exception("Name cannot contain a number");
  }
} else {
  throw new Exception("An input is required");
}

$date = gmdate("Y-m-d H:i:s");

$submitQuery = "INSERT INTO `high_scores`
                SET `name` = '$name',
                    `attempts` = '$attempts',
                    `date` = '$date'";

$submitQueryResult = mysqli_query($conn, $submitQuery);

if (!$submitQueryResult) {
  throw new Exception("ERROR: " . mysqli_error($conn));
}

?>
