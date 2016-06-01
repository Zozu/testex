var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
	User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findUserById(id)
    	.then(user => {
    		done(null, user);
    	});
});

passport.use('login', new LocalStrategy({passReqToCallback: true}, (req, username, password, done) => {
    return User.tryLogin(req.body.username, req.body.password)
  		.then(user => {
  			return done(null, user);
  		})
  		.catch(err => {
  			return done(null, false, err);
  		});
}));

passport.use('signup', new LocalStrategy({passReqToCallback: true }, (req, username, password, done, email, role) => {
	return User.addUser(req.body)
		.then(savedUser => {
			return done(null, savedUser);
		})
		.catch(err => {
			if (err === false) return done(null, false);
			else return done(err);
		});  
}));

module.exports = passport;