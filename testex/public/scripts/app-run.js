angular.module('testex')
	.run(['$state', '$rootScope', 'AuthService', function ($state, $rootScope, AuthService) {
	    $rootScope.logout = function() {
	        AuthService.logout();
	    };

	    $rootScope.updateUser = function() {
	    	$rootScope.rootUser = AuthService.getUser();
	    }

	    $rootScope.isAuthorized = function() {
	    	$rootScope.authorized = AuthService.isLogged;
	    }
}]);