
	$scope.msg = null;
	$scope.editing = false;
	$scope.contact = false;

	// Fetch all contacts
	firebaseService.all().then(function(contacts) {
		$scope.contacts = contacts;	
	})

	// Add new contact
	$scope.add = function(){
		$scope.msg     = null;
		$scope.contact = {};
		$scope.pic     = "assets/images/nopic.jpeg";
	}

	// Show contact details
	$scope.showDetails = function(id, $index){
		// clear pending action and goto initialization mode
		$scope.cancelForm();

		$scope.pic     = "http://lorempixel.com/100/100/people/"+$index;
		$scope.contact = firebaseService.get(id);
	}

	// Update contact details
	$scope.saveContact = function(id){
		// Update contact
		if(id){
			firebaseService.update($scope.contact, id).then(function(response){
				$scope.msg = {type : "success","msg" : "Updated"};
				// fill contact object with new info
				$scope.showDetails(response.key);				
			}, function(err){
				$scope.msg = {type : "error","msg" : "Argg, Something went wrong!"};
			});
		}else{
			// add contact
			firebaseService.add($scope.contact).then(function(response){
				$scope.msg     = {type : "success","msg" : "Contact added"};
				// fill contact object with new info
				$scope.showDetails(response.key);
			}, function(err){
				$scope.msg = {type : "error","msg" : "Argg, Something went wrong!"};
			});
		}
		$scope.cancelForm();
	}

	// Delete contact
	$scope.removeContact = function(id){
		firebaseService.remove(id).then(function(response){
			$scope.msg = {type : "success","msg" : "Contact deleted!"};
		}, function(err){
			$scope.msg = {type : "error","msg" : "Argg, Something went wrong!"};
		});
		$scope.cancelForm();
	}

	// Handle form cancel button
	$scope.cancelForm = function(){
		$scope.editing = false;			
		$scope.contact = false;			
	}

	// enable edit mode
	$scope.editMode = function(){
		$scope.editing = true;
	}