angular.module('testex').controller("MainCtrl", ['$scope', '$rootScope', '$state', 'users', function($scope, $rootScope, $state, users) {
	$scope.users = users;
	$scope.openAddModal = function() {

	}
}]); 