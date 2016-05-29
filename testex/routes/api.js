var express = require('express'),
	router = express.Router(),
	User = require('../models/user-model');

router.get('/user/all', (req, res, next) => {
	User.getAll()
		.then(users => {res.status(200).end(users);})
		.catch(err => {res.status(500).end(err);});
});

router.get('/user/:email', (req, res, next) => {
	User.findUser(req.params.email)
		.then(user => res.status(200).end(user);)
		.catch(err => {
			if (err === false) res.status(404).end('Not Found');
			else res.status(500).end(err);
		});
});

router.put('/user', (req, res, next) => {
	console.log("AAAAAAAAAAAAAAAAAAAAAAAAA");
	console.log(req.body.user);
	User.addUser(req.body.user)
		.then(savedUser => {res.status(200).end(savedUser);})
		.catch(err => {
			if (err === false) res.status(403).end('Already exist');
			else res.status(500).end(err);
		});
});

router.update('/user/:email', (req, res, next) => {
	User.updateUser(req.params.email, req.body.user)
		.then(updatedUser => {res.status(200).end(updatedUser);})
		.catch(err => {
			if (err === false) res.status(404).end('Not Found');
			else res.status(500).end(err);
		});
});

router.delete('/user/:email', (req, res, next) => {
	User.deleteUser(req.params.email)
		.then(deletedUser => {res.status(200).end(deletedUser);})
		.catch(err => {res.status(500).end(err);});
})

module.exports = router;
