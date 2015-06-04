var formApp = angular.module('formApp', [])

    .controller('formController', function($scope, $rootScope, $http) {
  
        // we will store our form data in this object
        $scope.formData = {};
        $scope.addResponse = function(add){
        $scope.response = [];
        for (var i = 0; i < 5; i++) {
        	$scope.response.push($scope.formData);
        };
		$http.post('../api/v1/insertSurvey', {"responses": angular.toJson($scope.response)})
			.success(function(data, status, headers, config){
	            console.log("inserted Successfully");
	        });
	    };
    });