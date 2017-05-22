
// Directive to generate user pic using id
cbApp.directive('userPic', function(appConstants) {
  return {
    restrict: 'E',
    template: '<img class="circle" ng-src="{{imgsrc}}">',
    scope: {
      imageid: '@'
    },
    link: function(scope, elem, attr){
  		scope.$watch('imageid', function(value) {
  	    	if(scope.imageid){
  	    		scope.imgsrc = 'https://randomuser.me/api/portraits/men/'+value+'.jpg';
  	    	}
  	    	else
  	    		scope.imgsrc = appConstants.default_pic;
  		});
    },
    replace: true   
  };
});