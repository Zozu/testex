angular.module('testex').controller("RegisterCtrl", ['$scope', 'AuthService', function($scope, AuthService) {
	$scope.registerUser = {};
	$scope.register = function() {
		AuthService.signup($scope.registerUser.email, $scope.registerUser.password, $scope.registerUser.username)
			.then(function(res){
				if(res.status == 200) {
					$rootScope.updateUser();
					$rootScope.isAuthorized();
					$state.go('main');
				}
				else return Promise.reject(res);
			});
	};
}]); 