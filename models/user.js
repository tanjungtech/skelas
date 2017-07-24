var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	fullname: { type: String, required: true },
	email: { type: String, required: true, index:{unique: true}},
	password: { type: String, required: true },
	createdAt: {
		type: Date,
		default: Date.now
	},
	verified: {
		type: Boolean,
		default: true
	}
},{ minimize: false });

var User = mongoose.model('User', userSchema);

module.exports = User;