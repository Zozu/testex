angular.module('testex')
	.run(['$rootScope', 'AuthService', function ($rootScope, AuthService) {
	    $rootScope.updateUser = function() {
		    $rootScope.rootUser = AuthService.getUser();
			$rootScope.authorized = AuthService.isLogged();
		};

		$rootScope.logout = function() {
	        AuthService.logout()
	        	.then(function() {
	        		$rootScope.updateUser();
	        	});
	    };

	    AuthService.checkLoggedin()
		    .then(function() {
			    $rootScope.updateUser();
		    });
}]);