angular.module('testex').controller('DeleteModalInstanceCtrl', ['$scope', '$uibModalInstance',
		function ($scope, $uibModalInstance) {
	$scope.ok = function () {
    	$uibModalInstance.close();
  	};

  	$scope.cancel = function () {
    	$uibModalInstance.dismiss();
  	};
}]);