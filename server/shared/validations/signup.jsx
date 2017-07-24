import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data){
	let errors = {};

	if (validator.isEmpty(data.fullname ? data.fullname : '')) {
		errors.fullname = 'This field is required';
	}
	if (!validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}
	if (validator.isEmpty(data.password ? data.password : '')) {
		errors.password = 'This field is required';
	}
	if (validator.isEmpty(data.passwordConfirmation ? data.passwordConfirmation : '')) {
		errors.passwordConfirmation = 'This field is required';
	}
	if (!validator.equals(data.password, data.passwordConfirmation)) {
		errors.passwordConfirmation = 'Passwords must match';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}
