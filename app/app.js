var cbApp = angular.module('contactbookApp', ['ui.router','firebase']);

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
			controller : 'detailsCtrl',
			templateUrl: 'templates/details.html'
        })
        
});