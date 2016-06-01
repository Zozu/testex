angular.module('testex').controller("MainCtrl", ['$scope', '$rootScope', '$state', '$uibModal', 'User', 'users', 
		function($scope, $rootScope, $state, $uibModal, User, users) {
	$scope.users = users;
	$scope.openAddModal = function () {
    	var modalInstance = $uibModal.open({
      		animation: true,
      		templateUrl: '/html/modals/user-modal.html',
      		controller: 'UserModalInstanceCtrl',
      		resolve: {
        		user: null,
        		modal: {
        			header: 'Add new user',
        			successButton: 'Create'
        		},
        		changeUsername: true,
        		createPassword: true
      		}
    	});

    	modalInstance.result
    	.then(function (res) {
      		var newUser = new User(res);
      		newUser.save();
    	});
  	};
}]); 