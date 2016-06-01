angular.module('testex').controller("LoginCtrl", ['$scope', '$state', '$rootScope', 'AuthService', 
		function($scope, $state, $rootScope, AuthService) {
	$scope.loginUser = {};
	$scope.login = function() {
		AuthService.login($scope.loginUser.username, $scope.loginUser.password)
			.then(function(res){
				if(res.status == 200) {
					$rootScope.updateUser();
					$state.go('main');
				}
				else return Promise.reject(res);
			});
	}
}]); 