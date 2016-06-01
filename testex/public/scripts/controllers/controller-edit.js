angular.module('testex').controller("EditCtrl", ['$state', '$scope', '$uibModal', 'UserService', 'user', 
		function($state, $scope, $uibModal, UserService, user) {
	$scope.user = user;
	$scope.openEditModal = function() {
		var modalInstance = $uibModal.open({
      		animation: true,
      		templateUrl: '/html/modals/user-modal.html',
      		controller: 'DeleteModalInstanceCtrl',
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
    		console.log(res);
      		var newUser = UserService.toFactoryUser(res);
      		newUser.update(res._id);
    	});
	};
	$scope.openDeleteModal = function () {

	};
}]); 