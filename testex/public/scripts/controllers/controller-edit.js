angular.module('testex').controller("EditCtrl", ['$state', '$scope', function($state, $scope) {
	$scope.user = $state.current.data.user;
	$scope.openEditModal = function() {

	};
	$scope.openDeleteModal = function () {

	};
}]); 