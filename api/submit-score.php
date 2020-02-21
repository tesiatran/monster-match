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
}

?>
