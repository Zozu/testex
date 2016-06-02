angular.module('testex')
	.run(['$state', '$rootScope', 'AuthService', function ($state, $rootScope, AuthService) {
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
		    	$state.go('welcome');
			    $rootScope.updateUser();
		    });
}]);