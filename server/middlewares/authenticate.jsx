import jwt from 'jsonwebtoken';
import config from '../config.jsx';
import User from '../../models/user.js';

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

export default (req, res, next) => {
	const authorizationHeader = req.headers['authorization'];
	let token;

	if (authorizationHeader) {
		token = authorizationHeader.split(' ')[1];
	}

	if (token) {
		jwt.verify(token, config.jwtSecret, (err, decoded) => {
			if (err) {
				res.status(401).json({ error: 'Failed to authenticate' });
			} else {
				var params = { _id: decoded.id };
				User.findOne(params).select('email _id fullname').exec().then(function(user){
					if (!user) {
						res.status(404).json({ error: 'No such user' });
					} else {
						req.currentUser = user;
						next();
					}
				});
			}
		});
	} else {
		res.status(403).json({
			error: 'No Token provided'
		});
	}
}