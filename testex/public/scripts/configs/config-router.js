angular.module('testex')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    
    function getUser(UserService, $stateParams){
        return UserService.getUser($stateParams.userEmail);
    }

    function getUsersArray(UserService){
        return UserService.getAllUsers();
    }

    function checkLogged($state, AuthService) {
                console.log(AuthService.isLogged());
        return new Promise(function(resolve, reject){
            if(AuthService.isLogged() === false) {
                $state.go('welcome');
                reject();
            }
            else resolve();
        });
    }

    function checkUnLogged($state, AuthService) {
                console.log(AuthService.isLogged());
        return new Promise(function(resolve, reject){
            if(AuthService.isLogged() === false) resolve();
            else {
                $state.go('main');
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
                isAuthorized: checkLogged
            },
            data: {
                users: getUsersArray
            }
        })
        .state('edit', {
            url: '/edit',
            templateUrl: 'html/setting-user.html',
            controller: 'EditCtrl',
            params:{
                userEmail: null
            },
            resolve: {
                isAuthorized: checkLogged
            },
            data: {
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