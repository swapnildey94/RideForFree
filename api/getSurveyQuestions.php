<?php

	header("Content-Type: application/json");

	// SURVEY QUESTIONS FROM DATABASE FOR ANGULAR

	include('dbconn.php');

	if (!empty($_GET['actid'])) {
		
		$actid = $_GET['actid'];
		$query = "SELECT * FROM mstTabPushData WHERE activityid = '".$actid."'";
		$result = mysqli_query($con, $query) or die("die");

		$surveyQuestions = array();

		while ($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {

			$question['questionid'] 	=  	$row['questionid'];
			$question['question'] 		=  	$row['question'];
			$question['optionA']		=	$row['optionA'];
			$question['optionB']		=	$row['optionB'];
			$question['optionC']		=	$row['optionC'];
			$question['optionD']		=	$row['optionD'];

			array_push($surveyQuestions, $question);
		}

		/*if (empty($result)) {
			// name not found
			deliver_response(200, "Survey Not Found", NULL);
		}else{
			// name found
			deliver_response(200, "Survey Found", );
		}*/

		//deliver_response(200, "Survey", $surveyQuestions);
		echo json_encode($surveyQuestions);

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