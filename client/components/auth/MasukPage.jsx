import React from 'react';
import Helmet from 'react-helmet';
import MasukForm from './MasukForm.jsx';

class MasukPage extends React.Component {
	render() {
		return (
			<div>
				<Helmet
					title="Halaman Masuk"
				/>
				<div className="container">
					<div className="col-md-4 col-md-offset-4">
						<MasukForm />
					</div>
				</div>
			</div>
		);
	}
}

export default MasukPage;