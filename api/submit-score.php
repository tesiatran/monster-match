<?php

require_once("functions.php");
set_exception_handler("error_handler");
require_once("db_connection.php");
startup();

$bodyData = getBodyData();

if ($bodyData["score"]) {
  $score = $bodyData["score"];
  if (gettype($score) !== "integer") {
    throw new Exception("Score must be a number");
  }
  if (intval($score) < 1) {
    throw new Exception("Score must be greater than 0");
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

$submitQuery = "INSERT INTO `high_scores`
                SET `name` = '$name',
                    `score` = '$score'";

$submitQueryResult = mysqli_query($conn, $submitQuery);

if (!$submitQueryResult) {
  throw new Exception("ERROR: " . mysqli_error($conn));
}

?>
