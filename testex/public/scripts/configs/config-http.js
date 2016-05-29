angular.module('testex')
    .config(['$httpProvider', function($httpProvider) {

    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

    $httpProvider.interceptors.push(function($q, $state) {
        return {
            response:function(response) {
                return response;
            }
            , responseError:function(response) {
                if (response.status === 401)
                $state.go('login');
                return $q.reject(response);
            }
        }
        ;
    });
}]);