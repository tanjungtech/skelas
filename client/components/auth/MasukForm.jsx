import React from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup.jsx';
import validateInput from '../../../server/shared/validations/login.jsx';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions.jsx';

class MasukForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			identifier: '',
			password: '',
			errors: {},
			isLoading: false
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange= this.onChange.bind(this);
	}

	isValid() {
		const { errors, isValid } = validateInput(this.state);

		if(!isValid) {
			this.setState({ errors });
		}

		return isValid;
	}

	onSubmit(e) {
		e.preventDefault();
		if (this.isValid()) {
			this.setState({ errors: {}, isLoading: true });
			this.props.login(this.state).then(
				(res) => this.context.router.history.push('/'),
				(err) => this.setState({ errors: err.response.data.errors, isLoading: false })
			);
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { errors, identifier, password, isLoading } = this.state;
		return (
			<form onSubmit={this.onSubmit}>
				<h1>Login</h1>

				{ errors.form && <div className="alert alert-danger">{errors.form}</div> }

				<TextFieldGroup
					field="identifier"
					label="Email"
					value={identifier}
					error={errors.identifier}
					onChange={this.onChange}
				/>
				<TextFieldGroup
					field="password"
					label="Password"
					value={password}
					error={errors.password}
					onChange={this.onChange}
					type="password"
				/>
				<div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Masuk</button></div>
			</form>
		);
	}
}

MasukForm.propTypes = {
	login: PropTypes.func.isRequired
}

MasukForm.contextTypes = {
	router: PropTypes.object.isRequired
}

export default connect(null, { login })(MasukForm);