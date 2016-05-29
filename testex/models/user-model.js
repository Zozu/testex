var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs');

var toHash = pass => bcrypt.hashSync(pass, bCrypt.genSaltSync(10), null);

var userSchema = mongoose.Schema({
    username: { 
    	type: String, 
    	required: true,
    	minlength: 3,
    	maxlength: 20
    },
    email: { 
    	type: String, 
    	required: true,
    	index: { unique: true },
    	match: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i 
    },
    password: { 
    	type: String, 
    	required: true,
    	minlength: 6,
    	maxlength: 20, 
    	set: toHash
    },
    admin: { 
    	type: Boolean,
    	default: false
    }
});

var User = mongoose.model('User', userSchema);

User.addUser = userFromClient => {
	var addUserPromise = User.findOne({'email': user.email}, {'password': 0}).exec();

	return addUserPromise
		.then((user) => {
			if(user) throw false;
			else {
				var newUser = new User(userFromClient);
				return newUser.save();
			}
		})
		.then(savedUser => savedUser)
		.catch(err => err);
};

User.getAll = () => {
	var getAllPromise = User.find({}, {'password': 0}).exec();
	return getAllPromise
		.then(users => users)
		.catch(err => err);
    /*var userMap = {};*/

    /*users.forEach(function(user) {
      userMap[user._id] = user;
    });*/ 
};

User.findUser = email => {
	var findUserPromise = User.findOne({'email': email}, {'password': 0}).exec();

	return findUserPromise
		.then(user => {
	        if (!user){
	            throw false;                 
	        }
	        return user;
		})
		.catch(err => err);
};

User.updateUser = (email, userFromClient) => {
	return this.findUser(email)
		.then(user => {
			user.username = userFromClient.username;
			user.password = userFromClient.password;
			user.admin = userFromClient.admin;
			return user.save();
		})
		.then(savedUser => savedUser)
		.catch(err => err);
};

User.deleteUser = email => {
	return User.findOneAndRemove({'email': email}).exec();
};

User.tryLogin = (email, password) => {
	var loginPromise = User.findOne({'email': email}).exec();

	return	loginPromise
		.then(user => {
	        if (!user){
	            console.log('User Not Found with email ' + email);
	            throw false;             
	        }
	        if (bcrypt.compareSync(password, user.password)){
	            console.log('Invalid Password');
	            throw false;
	        }
	        return user;
	    })
	    .catch(err => err);
};

module.exports = User;