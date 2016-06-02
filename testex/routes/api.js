var express = require('express'),
	router = express.Router(),
    passport = require('../libs/auth'),
	User = require('../models/user-model');

module.exports = function(passport){

	//get all users
	router.get('/user/all', auth, (req, res, next) => {
		User.getAll()
			.then(users => {res.status(200).send(users);})
			.catch(err => {res.status(500).send(err);});
	});

	//get user by id
	router.get('/user/:id', auth, (req, res, next) => {
		User.findUserById(req.params.id)
			.then(user => res.status(200).send(user))
			.catch(err => {
				if (err === false) res.status(404).send('Not Found');
				else res.status(500).send(err);
			});
	});

	//create new user
	router.put('/user', auth, isAdmin, (req, res, next) => {
		User.addUser(req.body)
			.then(savedUser => {res.status(200).send(savedUser);})
			.catch(err => {
				console.log(err);
				if (err === false) res.status(403).send('Already exist');
				else res.status(500).send(err);
			});
	});

	//update user by id
	router.put('/user/:id', auth, canUpdate, (req, res, next) => {
		User.updateUser(req.params.id, req.body)
			.then(updatedUser => {res.status(200).send(updatedUser);})
			.catch(err => {
				if (err === false) res.status(404).send('Not Found');
				else res.status(500).send(err);
			});
	});

	//delete user by id
	router.delete('/user/:id', auth, isAdmin, (req, res, next) => {
		User.deleteUser(req.params.id)
			.then(deletedUser => {res.status(200).send(deletedUser);})
			.catch(err => {res.status(500).send(err);});
	})

	//registration request
	router.post('/signup', passport.authenticate('signup'), (req, res) => {
		res.status(200).send(req.user);
	});

	//is user logged
	router.get('/loggedin', (req, res) => { 
		res.status(200).send(req.isAuthenticated() ? req.user : '0'); 
	});

	router.post('/login', passport.authenticate('login'), (req, res) => {
	  	res.status(200).send(req.user);
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
  	if (!req.user.admin) 
  		res.sendStatus(401);
  	else
  		next();
};

var canUpdate = (req, res, next) => {
	//if (!req.user.admin && req.params.id != req.user._id) 
  		//res.sendStatus(401);
  	if(req.params.id != req.user._id)
  			isAdmin(req, res, next);
  	else
  		next();
}
