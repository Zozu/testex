angular.module('testex')
	.config(function ($stateProvider, $httpProvider, $urlRouterProvider) {
	$stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'html/main.html',
            controller: 'MainCtrl',
            resolve: {
                authorized: isAuthorized
            }
        })
        .state('edit', {
            url: '/edit',
            templateUrl: 'html/setting-user.html',
            controller: 'EditCtrl',
            params:{
                userId: null
            },
            resolve: {
                authorized: isAuthorized,
                user: getUser
            }
        })
        .state('welcome', {
            url: '/welcome',
            templateUrl: 'html/welcome.html',
            controller: 'WelcomeCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'html/login.html',
            controller: 'LoginCtrl'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'html/register.html',
            controller: 'RegisterCtrl'
        });
    $urlRouterProvider.otherwise('/');
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

    function isAuthorized($http, $state) {
                    /*return $http.get('/api/servers')
                        .then(function (res) {
                            if (!res.data || !res.data.length) {
                                throw res;  
                            }
                            return res.data;
                        })
                        .catch(function (err) {
                            $state.go('error');
                        });*/
                    return true;
                }
    function getUser(){
        return true;
    }
});