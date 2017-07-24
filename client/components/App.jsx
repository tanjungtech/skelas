import React from 'react';
import Helmet from 'react-helmet';
import NavigationBar from './NavigationBar.jsx';
import FlashMessagesList from './flash/FlashMessagesList';

class App extends React.Component {
	render () {
		return(
			<div>
				<Helmet title="Situs Tempat Belajar Bersama" />
				<NavigationBar />
				<FlashMessagesList />;
				{this.props.children}
			</div>
		);
	}
}

export default App;