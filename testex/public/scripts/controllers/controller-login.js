angular.module('testex').controller("LoginCtrl", ['$scope', 'AuthService', function($scope, AuthService) {
	$scope.loginUser = {};
	$scope.login = function() {
		AuthService.login($scope.loginUser.email, $scope.loginUser.password)
			.then(function(res){
				if(res.status == 200) {
					$rootScope.updateUser();
					$rootScope.isAuthorized();
					$state.go('main');
				}
				else return Promise.reject(res);
			});
	}
}]); 