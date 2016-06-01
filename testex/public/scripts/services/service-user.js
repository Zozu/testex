angular.module('testex')
	.service('UserService', ['$http', 'User', function($http, User){
	this.getUser = function(email) {
		return $http.get('/user/' + email)
			.then(function(res){
				if(res.status != 200) throw res;
				else {
					return toFactoryUser(res.data);
				}
			});
	};
	this.deleteUser = function(email) {
		return $http.delete('/user/' + email)
			.then(function(res){
				if(res.status != 200) throw res;
				else {
					return toFactoryUser(res.data);
				}
			});
	};
	this.getAllUsers = function() {
		return $http.get('/user/all')
			.then(function(res){
				if(res.status != 200) throw res;
				else {
					return toFactoryUserArray(res.data);
				}
			});
	};
	this.getMe = function() {
		return $http.get('/loggedin')
			.then(function(user) {
            	if (user !== '0') return user;
            	else throw new Exception(null);
        	});
	};
	function toFactoryUser(us){
		var user = new User(us.email, us.username, us.admin);
		if(us.password) user.password = us.password;
		return user;
	};
	function toFactoryUserArray(usersArray){
		var array = [];
		for (var i = usersArray.length - 1; i >= 0; i--) {
			array.push(toFactoryUser(usersArray[i]));
		}
		return array;
	};
}]);