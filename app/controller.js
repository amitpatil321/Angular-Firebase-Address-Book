cbApp.controller("homeCtrl",["$scope","firebaseService", function($scope, firebaseService){

	// Fetch all contacts
	firebaseService.all().then(function(contacts) {
		$scope.contacts = contacts;	
	}) 	
}]);

cbApp.controller("detailsCtrl",["$scope","$stateParams","firebaseService", function($scope, $stateParams, firebaseService){
	
	$scope.id      = $stateParams.id;
	
	// Show contact details
	$scope.pic     = "http://lorempixel.com/100/100/people/"+ firebaseService.getIndex($scope.id);
	
	console.log($scope.pic);
	
	$scope.contact = firebaseService.get($scope.id);

}]);

cbApp.controller("addCtrl",["$scope","firebaseService", function($scope, firebaseService){
	

}]);