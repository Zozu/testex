angular.module('testex').controller("EditCtrl", ['$state', '$rootScope', '$scope', '$uibModal', 'UserService', 'user', 
		function($state, $rootScope, $scope, $uibModal, UserService, user) {
	$scope.user = angular.copy(user);
	$scope.openEditModal = function() {
		var modalInstance = $uibModal.open({
      		animation: true,
      		templateUrl: '/html/modals/user-modal.html',
      		controller: 'UserModalInstanceCtrl',
      		resolve: {
        		user: function () {
          			return $scope.user;
        		},
        		modal: {
        			header: 'Edit user',
        			successButton: 'Save'
        		},
        		changeUsername: false,
        		createPassword: false
      		}
    	});

    	modalInstance.result
    	.then(function (res) {
      		var newUser = UserService.toFactoryUser(res);
      		newUser.update(res._id)
                .catch(function() {
                    $scope.user = angular.copy(user);
                });
    	});
	};
	$scope.openDeleteModal = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/html/modals/delete-modal.html',
            controller: 'DeleteModalInstanceCtrl'
        });

        modalInstance.result
        .then(function () {
            UserService.deleteUser($scope.user._id)
                .then(function() {
                    $state.go('main');
                });
        });
	};
}]); 