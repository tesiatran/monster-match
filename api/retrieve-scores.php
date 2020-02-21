<?php

require_once("functions.php");
set_exception_handler("error_handler");
startup();
require_once("db_connection.php");

$retrieveQuery = "SELECT * FROM `high_scores` ORDER BY attempts ASC, date ASC";

$retrieveQueryResult = mysqli_query($conn, $retrieveQuery);

  if(!$retrieveQueryResult) {
    throw new Exception("ERROR: " . mysqli_error($conn));
  }

$rowCount = mysqli_num_rows($scoreResult);

if($rowCount === 0) {
  throw new Exception("No rows exist.");
}

$output = [];

while($row = mysqli_fetch_assoc($scoreResult)) {
  $output[] = $row;
}

$json_output = json_encode($output);
print($json_output);

?>
