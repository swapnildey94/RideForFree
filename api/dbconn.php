<?php

	$host = "localhost";
	$user = "gleecusc_rff";
	$database = "gleecusc_rff";
	$pass = "rff123#@";

	$con= mysqli_connect($host, $user, $pass, $database);

	if (mysqli_connect_errno()) {
		echo "Failed to connect: ". mysqli_connect_errno();
	}

?>