var express = require('express'),
	router = express.Router(),
    passport = require('../libs/auth'),
	User = require('../models/user-model');

module.exports = function(passport){

	//get all users
	router.get('/user/all', auth, (req, res, next) => {
		User.getAll()
			.then(users => {res.status(200).end(users);})
			.catch(err => {res.status(500).end(err);});
	});

	//get user by email
	router.get('/user/:email', auth, (req, res, next) => {
		User.findUser(req.params.email)
			.then(user => res.status(200).end(user))
			.catch(err => {
				if (err === false) res.status(404).end('Not Found');
				else res.status(500).end(err);
			});
	});

	//create new user
	router.put('/user', auth, isAdmin, (req, res, next) => {
		console.log("AAAAAAAAAAAAAAAAAAAAAAAAA");
		console.log(req.body.user);
		User.addUser(req.body.user)
			.then(savedUser => {res.status(200).end(savedUser);})
			.catch(err => {
				if (err === false) res.status(403).end('Already exist');
				else res.status(500).end(err);
			});
	});

	//update user by email
	router.put('/user/:email', auth, isAdmin, (req, res, next) => {
		User.updateUser(req.params.email, req.body.user)
			.then(updatedUser => {res.status(200).end(updatedUser);})
			.catch(err => {
				if (err === false) res.status(404).end('Not Found');
				else res.status(500).end(err);
			});
	});

	//delete user by email
	router.delete('/user/:email', auth, isAdmin, (req, res, next) => {
		User.deleteUser(req.params.email)
			.then(deletedUser => {res.status(200).end(deletedUser);})
			.catch(err => {res.status(500).end(err);});
	})

	//registration request
	router.post('/signup', passport.authenticate('signup'));

	//is user logged
	router.get('/loggedin', (req, res) => { 
		res.status(200).send(req.isAuthenticated() ? req.user : '0'); 
	});

	router.post('/login', passport.authenticate('login'), (req, res) => {
	  	res.status(200).end(req.user);
	});

	router.post('/logout', (req, res) => {
	  	req.logOut();
	  	res.sendStatus(200);
	});

	return router;
}


var auth = (req, res, next) => {
  	if (!req.isAuthenticated()) 
  		res.sendStatus(401);
  	else
  		next();
};

var isAdmin = (req, res, next) => {
  	if (!req.session.isAdmin) 
  		res.sendStatus(401);
  	else
  		next();
};
