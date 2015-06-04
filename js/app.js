var rideFree	=	angular.module('rideFree', ['ngRoute', 'youtube-embed']);

rideFree.config(['$routeProvider', function($routeProvider, $locationProvider){
	$routeProvider.
	when('/home', {
		templateUrl: 'partials/home.html',
		controller:  'homeController'
	})
	.when('/activity', {
		templateUrl: 'partials/activity.html',
		controller: 'activityController'
	})
	.when('/survey', {
		templateUrl: 'partials/survey.html',
		controller: 'surveyController'
	})
	.when('/survey-qs/:questionId', {
		templateUrl: 'partials/survey-qs.html',
		controller: 'surveyQSController'
	})
	.when('/quiz', {
		templateUrl: 'partials/quiz.html',
		controller: 'quizController'
	})
	.when('/quiz-qs/:questionId', {
		templateUrl: 'partials/quiz-qs.html',
		controller: 'quizQSController'
	})
	.when('/video', {
		templateUrl: 'partials/video.html',
		controller: 'videoController'
	})
	.otherwise({
		redirectTo: '/activity'
	});
}]);

rideFree.controller('fareController', function($scope, $rootScope, $timeout){
    $scope.counter = 0;
    $scope.fare = 99;
    $rootScope.discount = 0;
    $scope.onTimeout = function(){
        $scope.counter++;
        if ($scope.counter > 4) {
        	$scope.fare = $scope.fare + 12;
        };
        mytimeout = $timeout($scope.onTimeout,5000);
    }
    var mytimeout = $timeout($scope.onTimeout,5000);
    $scope.message = "I'm from fareController";
    $scope.stop = function(){
        $timeout.cancel(mytimeout);
    }
});

rideFree.controller('surveyQSController', function($scope, $rootScope, $routeParams, $http, $location){
		//$scope.message = "I'm the Survey Question";
		$scope.questions = $rootScope.survey;
		$scope.questionno = $routeParams.questionId;
		$scope.riderid = "rid123";
		if ($routeParams.questionId < $scope.questions.length - 1) {
			$scope.nextQuestion = Number($routeParams.questionId) + 1;
			$rootScope.surveyDone = false;
			$scope.lastQues = false;
		};
		if ($routeParams.questionId == $scope.questions.length - 1) {
			$rootScope.surveyDone = true;
			$scope.lastQues = true;
			$rootScope.discount += 50;
		};

		$scope.response = {};
		$scope.response.riderid = $scope.riderid;
		$scope.response.questionid = $scope.questions[$scope.questionno].questionid;

		$scope.addResponse = function(add){
			$rootScope.surveyResponse.push($scope.response);
			$location.path("/survey-qs/" + $scope.nextQuestion);
		};
		$scope.submitResponse = function(send){
			$rootScope.surveyResponse.push($scope.response);
			$http.post('api/v1/insertSurvey/', {"responses": angular.toJson($rootScope.surveyResponse)})
			.success(function(data, status, headers, config){
	            console.log("inserted Successfully");
	        });
	        $location.path("/activity");
		};
});

rideFree.controller('quizQSController', function($scope, $rootScope, $routeParams, $http, $location){
		//$scope.message = "I'm the Survey Question";
		$scope.questions = $rootScope.quiz;
		$scope.questionno = $routeParams.questionId;
		$scope.riderid = "rid123";
		if ($routeParams.questionId < $scope.questions.length - 1) {
			$scope.nextQuestion = Number($routeParams.questionId) + 1;
			$rootScope.quizDone = false;
			$scope.lastQues = false;
		};
		if ($routeParams.questionId == $scope.questions.length - 1) {
			$scope.nextQuestion = "#/activity";
			$rootScope.quizDone = true;
			$scope.lastQues = true;
			$rootScope.discount += 40;
		};

		$scope.response = {};
		$scope.response.riderid = $scope.riderid;
		$scope.response.questionid = $scope.questions[$scope.questionno].questionid;

		$scope.addResponse = function(add){
			$rootScope.quizResponse.push($scope.response);
			$location.path("/quiz-qs/" + $scope.nextQuestion);
		};
		$scope.submitResponse = function(send){
			$rootScope.quizResponse.push($scope.response);
			$http.post('api/v1/insertSurvey/', {"responses": angular.toJson($rootScope.quizResponse)})
			.success(function(data, status, headers, config){
	            console.log("inserted Successfully");
	        });
	        $location.path("/activity");
		};
});

rideFree.controller('videoController', function($scope, $rootScope){
		$scope.questions = $rootScope.video;
		$scope.no = 0;
		$scope.videoURL = 'http://www.youtube.com/embed/s0brZ8Cinao?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1';
		$rootScope.videoDone = true;
});

rideFree.controller('homeController', function($scope){
	$scope.message = "I'm from Home";
});

rideFree.controller('activityController', function($scope, $rootScope, $http){
	//$scope.message = "I'm from Activity";
	$http.get('api/v1/survey/').success(function(data) {
		$rootScope.survey = data;
	});
	$scope.surveyDone = function(e){               
               return $rootScope.surveyDone;
       };

    $http.get('api/v1/quiz/').success(function(data) {
		$rootScope.quiz = data;
	});
    $scope.quizDone = function(e){               
               return $rootScope.quizDone;
       };

    $http.get('api/v1/video/').success(function(data) {
		$rootScope.video = data;
	});
    $scope.videoDone = function(e){               
               return $rootScope.videoDone;
       };
});

rideFree.controller('surveyController', function($scope, $rootScope, $http, $location){
	//$scope.message = "I'm from Survey";
	$rootScope.surveyResponse  = [];
});

rideFree.controller('quizController', function($scope, $rootScope, $http, $location){
	//$scope.message = "I'm from Survey";
	$rootScope.quizResponse = [];
});