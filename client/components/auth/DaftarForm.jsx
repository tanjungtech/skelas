import React from 'react';
import PropTypes from 'prop-types';
import {render} from 'react-dom';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/signup.jsx';
import TextFieldGroup from '../common/TextFieldGroup.jsx';
import isEmpty from 'lodash/isEmpty';

class DaftarForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			fullname: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			errors: {},
			isLoading: false,
			invalid: false
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.checkUserExists = this.checkUserExists.bind(this);
	}
	onChange(e){
		this.setState({ [e.target.name]: e.target.value });
	}
	isValid(){
		const { errors, isValid } = validateInput(this.state);

		if(!isValid){
			this.setState({ errors });
		}

		return isValid;
	}
	checkUserExists(e){
		const field = e.target.name;
		const val = e.target.value;
		if (val !== ''){
			this.props.isUserExists(val).then(res => {
				let errors = this.state.errors;
				let invalid;
				if (res.data.user){
					errors[field] = field + ' sudah terdaftar';
					invalid = true;
				}else{
					delete errors[field];
				}
				this.setState({ errors, invalid: !isEmpty(errors) });
			});
		}
	}
	onSubmit(e){
		e.preventDefault();

		if(this.isValid()){
			this.setState({ errors: {}, isLoading: true });
			this.props.userSignupRequest(this.state).then(
				() => {
					this.props.addFlashMessage({
						type: 'success',
						text: 'You signed up successfully. Welcome!'
					});
					this.context.router.history.push('/');
				},
				({ response }) => this.setState({ errors: response.data, isLoading: false })
			);
		}
	}
	render () {
		const { errors } = this.state;
		return(
			<form onSubmit={this.onSubmit}>
				<h1>Bergabung dengan skelas</h1>
				
				<TextFieldGroup
					error={errors.fullname}
					label="Fullname"
					onChange={this.onChange}
					value={this.state.fullname}
					field="fullname"
				/>

				<TextFieldGroup
					error={errors.email}
					label="Email"
					onChange={this.onChange}
					checkUserExists = {this.checkUserExists}
					value={this.state.email}
					field="email"
					type="email"
				/>

				<TextFieldGroup
					error={errors.password}
					label="Password"
					onChange={this.onChange}
					value={this.state.password}
					field="password"
					type="password"
				/>

				<TextFieldGroup
					error={errors.passwordConfirmation}
					label="Password Confirmation"
					onChange={this.onChange}
					value={this.state.passwordConfirmation}
					field="passwordConfirmation"
					type="password"
				/>

				<div className="form-group">
					
					{ this.state.isLoading || this.state.invalid ? <button disabled className="btn btn-primary btn-lg">Daftar</button> : <button className="btn btn-primary btn-lg">Daftar</button> }
				</div>
			</form>
		)
	}
}

DaftarForm.propTypes = {
	userSignupRequest: PropTypes.func.isRequired,
	addFlashMessage: PropTypes.func.isRequired,
	isUserExists: PropTypes.func.isRequired
}

DaftarForm.contextTypes = {
	router: PropTypes.object.isRequired
}

export default DaftarForm;