<?php
	
	header("Content-Type: application/json");

	// process client request via URL
	include('dbconn.php');

	if(!empty($_GET['rid'])){
		
		$id = $_GET['rid'];
		$query = "SELECT * FROM mstRiderDetails WHERE riderid = '".$id."'";
		$result = mysqli_query($con, $query) or die("die");

		while ($row = mysqli_fetch_array($result)) {
			$name = $row['name'];
		}

		if (empty($name)) {
			// name not found
			deliver_response(200, "User Not Found", NULL);
		}else{
			// name found
			deliver_response(200, "User Found", $name);
		}

	}else{
		
		// throw INVALID REQUEST
		deliver_response(400, "Invalid Request", NULL);

	}

	function deliver_response($status, $status_message, $data){
		//header("HTTP/1.1 $status $status_message");

		$response['status'] = $status;
		$response['status_message'] = $status_message;
		$response['data'] = $data;

		$json_response = json_encode($response);
		echo $json_response;
	}


?>