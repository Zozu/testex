angular.module('testex')
	.service('AuthService', ['$http', '$state', function($http, $state){
	var rootUser = null;
	function login(username, password) {
		return $http.post('/login', {password: password, username: username})
			.then(function(res) {
				if(res.status == 200) {
					rootUser = res.data;
					return res;
				}
				else throw res;
			});
	};
	function signup(email, password, username) {
		var user = {
			email: email,
			password: password,
			username: username
		};
		return $http.post('/signup', user)
			.then(function(res) {
				if(res.status == 200) {
					rootUser = res.data;
					return res;
				}
				else throw res;
			});
	};

	function checkLoggedin() { 
		return $http.get('/loggedin')
		    .then(function(res) {
		        if (res.data !== '0') {
		        	rootUser = res.data;
		        	return Promise.resolve(res.data);
		        }
		        else {
		        	rootUser = null;
		        	return Promise.resolve(null);
		        }
		    });
	};

    function getUser(){
    	return rootUser;
    };

    function isLogged() {
    	return !!rootUser;
    }

    function logout() {
    	rootUser = null;
    	return $http.post('/logout')
    		.then(function(res){
    			if (res.status == 200) {
    				rootUser = null;
    				$state.go('welcome');
    			}
    		});
    };




	angular.extend(this, {
		isLogged: isLogged,
		checkLoggedin: checkLoggedin,
		login: login,
		signup: signup,
		getUser: getUser,
		logout: logout
	});
}]);