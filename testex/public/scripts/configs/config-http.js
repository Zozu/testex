angular.module('testex')
    .config(['$httpProvider', function($httpProvider) {

    $httpProvider.interceptors.push(['$q', '$injector', function($q, $injector) {
        return {
            request: function (request) {
                if(request.url.indexOf('html') == -1) request.url = '/api' + request.url;
                return request;
            },
            response:function(response) {
                return response;
            }, 
            responseError:function(response) {
                if (response.status === 401) {
                    $injector.get('$state').transitionTo('login');
                }
                return $q.reject(response);
            }
        }
        ;
    }]);
}]);