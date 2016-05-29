angular.module('testex').controller("NavBarCtrl", ['$scope', '$state', function($scope, $state) {
	$scope.user = {
		username: 'User111',
		id:3
	};
	$scope.authorized = true;
	$scope.logout = function() {
		$state.go('welcome');
	}
}]); 