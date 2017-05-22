
cbApp.service('firebaseService',["$firebaseArray", "$filter", function ($firebaseArray, $filter) {

	var fbObject = firebase.database().ref();
	var fbArray  = $firebaseArray(fbObject);    
	var contacts = {};
	
	// Return all contacts
	var getAll = function(){
		return fbArray.$loaded();
	};
	
	// Return single contact details	
	var getOne = function(id){
		return fbArray.$getRecord(id);
	};		

	// Add contact
	var addContact = function(info){
		return fbArray.$add(info);
	};
	
	// Update contact details
	var updateContact = function(newInfo,id){
		var index         = fbArray.$indexFor(id);
		fbArray[index]    = newInfo;
		fbArray[index].id = id;

		return fbArray.$save(index);
	};

	// Remove contact
	var removeContact = function(id){
		var index     = fbArray.$indexFor(id);
		return fbArray.$remove(index);		
	};

	// return methods
    return {
		getAll       : getAll,
		getOne       : getOne,
		addContact   : addContact,
		updateContact: updateContact,
		removeContact: removeContact
    };
}]);