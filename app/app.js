var cbApp = angular.module('contactbookApp', ['ui.router','firebase']);

cbApp.constant("appConstants", {
   "default_pic" : "assets/images/nopic.jpeg"
});

cbApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        .state('home', {
			url        : '/home',
			controller : 'homeCtrl',
			templateUrl: 'templates/home.html'
        })
        
        .state('home.details', {
			url        : '/details/:id',
			params     : { id : null, msg : null },
			controller : 'detailsCtrl',
			templateUrl: 'templates/details.html'
        })        

        .state('home.edit', {
			url        : '/edit/:id',
			params     : { id : null},
			controller : 'editCtrl',
			templateUrl: 'templates/edit.html'
        })        

        .state('home.add', {
			url        : '/add/:id',
			params     : { id : null, msg : null},
			controller : 'addCtrl',
			templateUrl: 'templates/edit.html'
        })
        
});