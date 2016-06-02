angular.module('testex')
	.service('UserService', ['$http', 'User', function($http, User){
	this.getUser = function(id) {
		return $http.get('/user/' + id)
			.then(function(res){
				if(res.status != 200) throw res;
				else return res.data;
			});
	};
	this.deleteUser = function(id) {
		return $http.delete('/user/' + id)
			.then(function(res){
				if(res.status != 200) throw res;
				else {
					return res.data;
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
	function toFactoryUser(us){
		var user = new User(us.email, us.username, us.admin);
		if(us.password) user.password = us.password;
		return user;
	};
	function toFactoryUserArray(usersMap){
		var array = [];
		for(id in usersMap){
			if (!usersMap.hasOwnProperty(id)) continue;
			array.push(usersMap[id]);
		}
		return array;
	};
	this.toFactoryUser = toFactoryUser;
}]);