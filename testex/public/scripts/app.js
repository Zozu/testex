var app = angular.module("testex", ['ui.router'])
	.run(function ($state, $rootScope) {
        $state.go('main');

	    $rootScope.logout = function() {
	        //$rootScope.message ='Logged out.';
	        $http.post('/logout');
	    };
    });