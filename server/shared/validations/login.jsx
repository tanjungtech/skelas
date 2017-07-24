import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
	let errors = {};

	if (validator.isEmpty(data.identifier)){
		errors.identifier = 'Wajib diisi';
	}

	if (validator.isEmpty(data.password)){
		errors.password = 'Harus Isi Password';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
}