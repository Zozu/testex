angular.module('testex').controller('DeleteModalInstanceCtrl', ['$scope', '$uibModalInstance', 'user', 'modal', 'changeUsername', 'createPassword',
		function ($scope, $uibModalInstance, user, modal, changeUsername, createPassword) {
	$scope.user = user;
	$scope.modal = modal;
	$scope.changeUsername = changeUsername;
	$scope.createPassword = createPassword;

	$scope.ok = function () {
    	$uibModalInstance.close($scope.user);
  	};

  	$scope.cancel = function () {
    	$uibModalInstance.dismiss('cancel');
  	};
}]);