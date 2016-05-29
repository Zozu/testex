angular.module('testex')
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    function checkLoggedin($q, $http, $rootScope, $state) {
        var deferred = $q.defer();

        $http.get('/loggedin').success(function(user) {
            if (user !== '0') deferred.resolve();
            else {
                //$rootScope.message ='You need to log in.';
                deferred.reject();
                $state.go('login');
            }
        return deferred.promise;
    };

    function getUser(UserService, $stateParams){
        return UserService.getUser($stateParams.userEmail);
    }

    function getUsersArray(UserService.getAllUsers){
        return UserService.getAllUsers();
    }

	$stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'html/main.html',
            controller: 'MainCtrl',
            resolve: {
                authorized: checkLoggedin,
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
                authorized: checkLoggedin,
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
}]);