<?php

require_once("functions.php");
set_exception_handler("error_handler");
startup();
require_once("db_connection.php");

$retrieveQuery = "SELECT * FROM `high_scores` ORDER BY score ASC, date ASC";

$retrieveQueryResult = mysqli_query($conn, $retrieveQuery);

  if(!$retrieveQueryResult) {
    throw new Exception("ERROR: " . mysqli_error($conn));
  }

$rowCount = mysqli_num_rows($retrieveQueryResult);

if($rowCount === 0) {
  throw new Exception("No data exists.");
}

$output = [];
while($row = mysqli_fetch_assoc($retrieveQueryResult)) {
  $output[] = $row;
}

$json_output = json_encode($output);
print($json_output);

?>
