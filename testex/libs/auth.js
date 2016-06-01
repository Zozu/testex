var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
	User = require('../models/user-model');

passport.serializeUser((user, done) => {
	console.log(111);
    done(null, user);
});

passport.deserializeUser((ID, done) => {
	console.log(222);
    User.findById(ID)
    	.then(user => {

	console.log(user);
    		done(err, user);});
});

passport.use('login', new LocalStrategy({passReqToCallback: true}, (req, username, password, done) => { 
	console.log(req.body.email);
	console.log(req.body.password);
	//TODO
    return User.tryLogin("max.selekh@gmail.com", req.body.password)
  		.then(user => {
  			return done(null, user);})
  		.catch(err => {return done(null, false, err);});
}));

passport.use('signup', new LocalStrategy({passReqToCallback: true }, (req, username, password, done, email, role) => {
	console.log(req.body);
	return User.addUser(req.body)
		.then(savedUser => {return done(null, savedUser);})
		.catch(err => {
			if (err === false) return done(null, false);
			else return done(err);
		});  
}));

module.exports = passport;