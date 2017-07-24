import React from 'react';
import EventForm from './EventForm.jsx';

class UserPage extends React.Component {
	render(){
		return (
			<div className="container">
				<EventForm />
			</div>
		);
	}
}

export default UserPage;