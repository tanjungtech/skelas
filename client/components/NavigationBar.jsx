import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions.jsx';

class NavigationBar extends React.Component {
	logout(e) {
		e.preventDefault();
		this.props.logout();
	}

	render() {
		const {isAuthenticated} = this.props.auth;

		const userLinks = (
			<ul className="nav navbar-nav navbar-right">
				<li><a href="#" onClick={this.logout.bind(this)}>Keluar</a></li>
			</ul>
		);

		const guestLinks = (
			<ul className="nav navbar-nav navbar-right">
				<li><Link to={'/daftar'}>Daftar</Link></li>
				<li><Link to={'/masuk'}>Masuk</Link></li>
			</ul>
		);

		return (
			<nav className="navbar navbar-default">
				<div className="container">
					<div className="navbar-header">
						<Link to={'/'} className="navbar-brand"><img src={require('../../public/local/logo.png')} /></Link>
					</div>
					<div className="collapse navbar-collapse">
						{ isAuthenticated ? userLinks : guestLinks }
					</div>
				</div>
			</nav>
		);
	}
}

NavigationBar.propTypes = {
	auth: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps, { logout })(NavigationBar);