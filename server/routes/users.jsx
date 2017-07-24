import express from 'express';
import commonValidations from '../shared/validations/signup.jsx';
import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';

import User from '../../models/user.js';

var assert = require('assert');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

let router = express.Router();

function validateInput(data, otherValidations) {
	let { errors } = otherValidations(data);

	var params = {'email': data.email};

	return User.findOne(params).exec().then(function(user){
		if(user){
			if (user.email === data.email) {
				errors.email = 'Sudah ada yang menggunakan email ini';
			}
		}
		return {
			errors,
			isValid: isEmpty(errors)
		};
	});
}

router.get('/:identifier', (req, res) => {
	var params = { 'email': req.params.identifier };
	User.findOne(params).select('email _id').exec().then(function(user){
		/*if (user.email === data.email) {
			errors.email = 'Sudah ada yang menggunakan email ini';
		}
		var validEmail = {
			errors,
			isValid: isEmpty(errors)
		}*/
		res.json({ user });
		//return validEmail;
	});
});

router.post('/', (req, res) => {
	validateInput(req.body, commonValidations).then(({ errors, isValid}) => {
		if (isValid) {
			const password_digest = bcrypt.hashSync(req.body.password, 10);

			var newUser = {
				fullname: req.body.fullname,
				email: req.body.email,
				password: password_digest
			};

			User.create(newUser, function (err, newUser) {
				if (err) {
					handleError(err);
				} else {
					res.json({ succes: true });
				}
			});
		} else {
			res.status(400).json(errors);
		}
	});
});

export default router;