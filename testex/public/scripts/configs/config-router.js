angular.module('testex')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    
    function getUser(UserService, $stateParams){
        return UserService.getUser($stateParams.userId);
    }

    function getUsersArray(UserService){
        return UserService.getAllUsers();
    }

    function checkLogged($injector, AuthService) {
        return new Promise(function(resolve, reject){
            if(AuthService.isLogged() === false) {
                $injector.get('$state').transitionTo('welcome');
                reject();
            }
            else resolve();
        });
    }

    function checkUnLogged($injector, AuthService) {
        return new Promise(function(resolve, reject){
            if(AuthService.isLogged() === false) resolve();
            else {
                $injector.get('$state').transitionTo('main');
                reject();
            }
        });
    }

	$stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'html/main.html',
            controller: 'MainCtrl',
            resolve: {
                isAuthorized: checkLogged,
                users: getUsersArray
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
                isAuthorized: checkLogged,
                user: getUser
            }
        })
        .state('welcome', {
            url: '/welcome',
            templateUrl: 'html/welcome.html',
            resolve: {
                isAuthorized: checkUnLogged
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'html/login.html',
            controller: 'LoginCtrl',
            resolve: {
                isAuthorized: checkUnLogged
            }
        })
        .state('register', {
            url: '/register',
            templateUrl: 'html/register.html',
            controller: 'RegisterCtrl',
            resolve: {
                authorized: checkUnLogged
            }
        });
    $urlRouterProvider.otherwise('/welcome');
}]);