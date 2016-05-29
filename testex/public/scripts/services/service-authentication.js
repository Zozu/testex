angular.module('testex')
	.service('AuthService', ['$http', function($http){
	this.login = function(email, password) {
		return $http.post('/login', {email: email, password: password})
			.then(res => {
				if(res.status == 200) return res.data;
				else throw res;
			})
	}
	this.signup = function(email, password, username) {
		var user = {
			email: emai,
			password: password,
			username: username
		};
		return $http.post('/login', {user: user})
			.then(res => {
				if(res.status == 200) return res.data;
				else throw res;
			})
	}
}]);