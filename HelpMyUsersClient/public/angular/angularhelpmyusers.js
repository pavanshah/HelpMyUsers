var app = angular.module("helpmyusers", ['ui.bootstrap']);

app.controller('helpmyusers', function($scope, $http) {
	
	$scope.trial = 20;
	
});

var guidedTourData = [];
var downloadURL="";

app.controller("guidedTours", function($scope, $http, $uibModal){

	//$scope.imagePath = "google.com.png";

	$scope.loadURL = function() {
		console.log("ljsbdgs"+$scope.url);
		console.log("in angular");
		$http.post("/loadURL", {"url":$scope.url}).
		then(function(response) {
			console.log(""+response.data);
			$scope.imagePath = response.data.result;
		});
	}

	$scope.publish = function() {
		console.log($scope.guidedTourData);
		$http.post("/publishGuidedTour", {"tourData":$scope.guidedTourData}).
		then(function(response) {

			downloadURL = response.data.result;

			 var modalInstance = $uibModal.open({
 			 animation : true,
		     templateUrl: './views/downloadScript.ejs',
	      	 size: "md",
	      	 controller:'DownloadModalController',
	      	 backdrop : true
	    });

	     modalInstance.result.then(function (userData) {

		     
		    }, function (err) {
		      
		});
		});
		
		
	}


	var init = function() {
		$scope.guidedTourData = guidedTourData;
	}
	init();

	$scope.setMessage = function() {

 		var modalInstance = $uibModal.open({
 			 animation : true,
		     templateUrl: './views/loginModal.ejs',
	      	 size: "md",
	      	 controller:'MessageModalController',
	      	 backdrop : true
	    });

	     modalInstance.result.then(function (userData) {

		     
		    }, function (err) {
		      
		});
		  
 	}

});




app.controller("MessageModalController", function($scope, $http, $uibModalInstance){


	//guidedTourData = [];

	$scope.add = function() {
		var temp = {
			"id":$scope.id,
			"header":$scope.header,
			"message":$scope.message
		};

		guidedTourData.push(temp);

		console.log(guidedTourData);
		$uibModalInstance.close();
	}

});


app.controller("DownloadModalController", function($scope, $http, $uibModalInstance){


	//guidedTourData = [];
	$scope.downloadURL = downloadURL;
/*	$scope.add = function() {
		var temp = {
			"id":$scope.id,
			"header":$scope.header,
			"message":$scope.message
		};

		guidedTourData.push(temp);

		console.log(guidedTourData);
		$uibModalInstance.close();
	}*/

});