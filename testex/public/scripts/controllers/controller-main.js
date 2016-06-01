angular.module('testex').controller("MainCtrl", ['$scope', '$state', function($scope, $state) {
	$scope.users = $state.current.data.users;
	$scope.openAddModal = function() {

	}
}]); 