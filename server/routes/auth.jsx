import express from 'express';
import User from '../../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config.jsx';

let router = express.Router();

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

router.post('/', (req, res) => {
	const { identifier, password } = req.body;
	
	var params = { 'email': identifier };
	User.findOne(params).exec().then(function(user){
		if(user){
			if (bcrypt.compareSync(password, user.get('password'))){
				const token = jwt.sign({
					id: user.get('_id'),
					email: user.get('email')
				}, config.jwtSecret);
				res.json({ token });
			} else {
				res.status(401).json({ errors: { form: 'Email atau password tidak cocok' } });
			}
		}else{
			res.status(401).json({ errors: { form: 'Invalid Login' } });
		}
	});

});

export default router;