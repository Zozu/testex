angular.module('testex').controller("RegisterCtrl", ['$scope', '$state', '$rootScope', 'AuthService', 
		function($scope, $state, $rootScope, AuthService) {
	$scope.registerUser = {};
	$scope.register = function() {
		AuthService.signup($scope.registerUser.email, $scope.registerUser.password, $scope.registerUser.username)
			.then(function(res){
				if(res.status == 200) {
					$rootScope.updateUser();
					$state.go('main');
				}
				else return Promise.reject(res);
			});
	};
}]); 