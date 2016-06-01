var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs');

var toHash = pass => bcrypt.hashSync(pass, bcrypt.genSaltSync(10), null);

var userSchema = mongoose.Schema({
    username: { 
    	type: String, 
    	required: true,
    	index: { unique: true },
    	minlength: 3,
    	maxlength: 20
    },
    email: { 
    	type: String, 
    	required: true,
    	match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
    },
    password: { 
    	type: String, 
    	required: true,
    	set: toHash
    },
    admin: { 
    	type: Boolean,
    	default: false
    }
});

var User = mongoose.model('User', userSchema);

User.addUser = userFromClient => {
	return User.count({}).exec()
		.then(count => {
			var overrideAdmin = (count == 0);
			return User.findOne({'username': userFromClient.username}, {'password': 0}).exec()
				.then((user) => {
					if(user) throw false;
					else {
						userFromClient.admin = overrideAdmin || userFromClient.admin;
						console.log(userFromClient);
						var newUser = new User(userFromClient);
						return newUser.save();
					};
				});
		});
};

User.getAll = () => {
	var getAllPromise = User.find({}, {'password': 0}).exec();
	return getAllPromise
		.then(users => {
			var userMap = {};

    		users.forEach(function(user) {
      			userMap[user._id] = user;
    		});

    		return userMap;
		});
};

User.findUserById = id => {
	var findUserPromise = User.findById(id, {'password': 0}).exec();

	return findUserPromise
		.then(user => {
	        if (!user){
	            throw false;                 
	        }
	        return user;
		});
};

User.updateUser = (id, userFromClient) => {
	return this.findUserById(id)
		.then(user => {
			user.email = userFromClient.email;
			user.password = userFromClient.password;
			user.admin = userFromClient.admin;
			return user.save();
		});
};

User.deleteUser = id => {
	return User.findOneAndRemove({'_id': id}).exec();
};

User.tryLogin = (username, password) => {
	var loginPromise = User.findOne({'username': username}).exec();

	return	loginPromise
		.then(user => {
	        if (!user){
	            console.log('User Not Found with username ' + username);
	            throw "";             
	        }
	        if (!bcrypt.compareSync(password, user.password)){
	            console.log('Invalid Password');
	            throw "";
	        }
	        return user;
	    });
};

module.exports = User;