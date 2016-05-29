var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
	User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((email, done) => {
    User.findUser(email)
    	.then(user => {done(err, user);});
});

passport.use('login', new LocalStrategy({passReqToCallback: true}, (req, username, password, done) => { 
    return User.tryLogin(req.body.email, req.body.password)
  		.then(user => {return done(null, user);})
  		.catch(err => {return done(null, false, err);});
}));

passport.use('signup', new LocalStrategy({passReqToCallback: true }, (req, username, password, done, email, role) => {
	User.addUser(req.body.user)
		.then(savedUser => {return done(null, savedUser);})
		.catch(err => {
			if (err === false) return done(null, false);
			else return done(err);
		});
           
}));

module.exports = passport;