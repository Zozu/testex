angular.module('testex').controller("MainCtrl", ['users', function(users, $scope) {
	$scope.users = users;
}]); 