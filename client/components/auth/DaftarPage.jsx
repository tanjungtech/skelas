import React from 'react';
import PropTypes from 'prop-types';
import {render} from 'react-dom';
import DaftarForm from './DaftarForm.jsx';
import { connect } from 'react-redux';
import { userSignupRequest, isUserExists } from '../../actions/signupActions.jsx';
import { addFlashMessage } from '../../actions/flashMessages.jsx';

class DaftarPage extends React.Component {
	render () {
		const { userSignupRequest, addFlashMessage, isUserExists } = this.props;
		return(
			<div>
				<div className="container">
					<div className="row">
						<div className="col-md-4 col-md-offset-4">
							<DaftarForm
							isUserExists={isUserExists}
							userSignupRequest={userSignupRequest}
							addFlashMessage={addFlashMessage} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

DaftarPage.propTypes = {
	userSignupRequest: PropTypes.func.isRequired,
	addFlashMessage: PropTypes.func.isRequired,
	isUserExists: PropTypes.func.isRequired
};

export default connect((state) => { return{} }, { userSignupRequest, addFlashMessage, isUserExists } )(DaftarPage);