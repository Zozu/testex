angular.module('testex')
	.factory('User', ['$http', function($http){
	var User = function (email, username, admin, password){
		this.obj = {
			username : username,
			email : email,
			password : password,
			admin : admin
		};
	};

	Object.defineProperty(User.prototype, 'username', {
  		get: function() {return this.obj.username;},
  		set: function(val) {this.obj.username = val;}
	});

	Object.defineProperty(User.prototype, 'email', {
  		get: function() {return this.obj.email;},
  		set: function(val) {this.obj.email = val;}
	});

	Object.defineProperty(User.prototype, 'password', {
  		get: function() {return this.obj.password;},
  		set: function(val) {this.obj.password = val;}
	});

	Object.defineProperty(User.prototype, 'admin', {
  		get: function() {return this.obj.admin;},
  		set: function(val) {this.obj.admin = val;}
	});

	User.prototype.save = function(){
		return $http.put('/user', this.obj)
			.then(function(res){
				if(res.status != 200) throw res;
				else {
					return res.data;
				}
			});
	};

	User.prototype.update = function(){
		return $http.put('/user/' + this.email, this.obj)
			.then(function(res){
				if(res.status != 200) throw res;
				else {
					return res.data;
				}
			});
	};

	return User;
}]);