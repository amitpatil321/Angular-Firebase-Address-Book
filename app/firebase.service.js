
cbApp.service('firebaseService',["$firebaseArray", "$filter", function ($firebaseArray, $filter) {

	var fbObject = firebase.database().ref();
	var fbArray  = $firebaseArray(fbObject);    
	var contacts = {};
	
	// Return all contacts
	var all = function(){
		return fbArray.$loaded();
	};
	
	// Find contact by id	
	var get = function(id){
		//return $filter('filter')(contacts, {id: id})[0];
		return fbArray.$getRecord(id);
	};		

	// Find index od contact in list by id	
	var getIndex = function(id){
		//return $filter('filter')(contacts, {id: id})[0];
		return fbArray.$indexFor(id);
	};	

	// Add contact
	var add = function(info){
		return fbArray.$add(info);
	};
	
	// Update contact details
	var update = function(newInfo,id){
		var index         = fbArray.$indexFor(id);
		fbArray[index]    = newInfo;
		fbArray[index].id = id;

		return fbArray.$save(index);
	};

	// Remove contact
	var remove = function(id){
		var index     = fbArray.$indexFor(id);
		return fbArray.$remove(index);		
	};

	// return methods
    return {
		all     : all,
		get     : get,
		getIndex: getIndex,
		add     : add,
		update  : update,
		remove  : remove
    };
}]);