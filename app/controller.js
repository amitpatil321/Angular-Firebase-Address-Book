cbApp.controller("homeCtrl",[
		"$scope",
		"firebaseService",
	function(
		$scope, 
		firebaseService
	){

	// Fetch all contacts
	firebaseService.getAll().then(function(contacts) {
		$scope.contacts = contacts;	
	}) 	
}]);

cbApp.controller("detailsCtrl",[
		"$scope",
		"$stateParams",
		"$state",
		"firebaseService", 
	function(
		$scope, 
		$stateParams, 
		$state,
		firebaseService
	){
	$scope.id      = $stateParams.id;
	// msg variables receives its values from previous actions 
	$scope.msg     = $stateParams.msg;
	// Get contact details
	$scope.contact = firebaseService.getOne($scope.id);

	// Delete contact
	$scope.removeContact = function(id){
		firebaseService.removeContact(id).then(function(response){
			$scope.msg = {type : "success","msg" : "Contact deleted!"};
			$state.go('^');
		}, function(err){
			$scope.msg = {type : "error","msg" : "Argg, Something went wrong!"};
		});
	}
	$scope.msg = "";
}]);

cbApp.controller("editCtrl",[
		"$scope",
		"$stateParams",
		"$state",
		"firebaseService",	
	function(
		$scope, 
		$stateParams, 
		$state,
		firebaseService
	){
	
	$scope.id      = $stateParams.id;

	// Get contact details
	$scope.contact = firebaseService.getOne($scope.id);

	// Save updated details
	$scope.saveContact = function(id){
		firebaseService.updateContact($scope.contact, id).then(function(response){
			$scope.msg = {type : "success","msg" : "Contact info Updated"};
			$state.go('home.details', { id : $scope.id, msg : $scope.msg}, {reload: true, inherit : false});
		}, function(err){
			$scope.msg = {type : "error","msg" : "Argg, Something went wrong!"};
		});		
	}

}]);

cbApp.controller("addCtrl",[
		"$scope",
		"$state", 
		"firebaseService",	
	function(
		$scope, 
		$state,
		firebaseService	
	){

	$scope.contact = {};
	$scope.pic     = "assets/images/nopic.jpeg";
	
	// Save updated details
	$scope.saveContact = function(id){
		// Get count of items so we can assign pic to user
		firebaseService.getAll().then(function(contacts) {
			
			// Set pic to new contact
			$scope.contact.pic = parseInt(contacts.length + 1);
			
			// Save contact
			firebaseService.addContact($scope.contact).then(function(response){
				//console.log(response);
				$scope.msg     = {type : "success","msg" : "Contact added"};
				// fill contact object with new info
				$state.go('home.details', { id : response.key, msg : $scope.msg}, {reload: true, inherit : false});
			}, function(err){
				console.log(err);
				$scope.msg = {type : "error","msg" : "Argg, Something went wrong!"};
			});				
		})
	}

}]);

