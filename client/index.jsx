import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer.jsx';
import setAuthorizationToken from './utils/setAuthorizationToken.jsx';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './actions/authActions.jsx';
import {Helmet} from "react-helmet";

import App from './components/App.jsx';
import DaftarPage from './components/auth/DaftarPage.jsx';
import MasukPage from './components/auth/MasukPage.jsx';
import UserPage from './components/profile/UserPage.jsx';
import Greetings from './components/Greetings.jsx';

import requireAuth from './utils/requireAuth.jsx';

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

if(localStorage.jwtToken) {
	setAuthorizationToken(localStorage.jwtToken);
	store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

setAuthorizationToken(localStorage.jwtToken);

render(
	<Provider store={store}>
		<Router>
		<div>
			<Helmet
				htmlAttributes={{lang: "en", amp: undefined}} // amp takes no value
				titleTemplate="%s | React App"
				titleAttributes={{itemprop: "name", lang: "en"}}
				meta={[
					{name: "description", content: "Server side rendering example"},
					{name: "viewport", content: "width=device-width, initial-scale=1"},
				]}
			/>
			<Route path="/" component={App} />
			<Route exact path="/" component={Greetings} />
			<Route path="/daftar" component={DaftarPage} />
			<Route path="/masuk" component={MasukPage} title='masuk' />
			<Route path="/user" component={requireAuth(UserPage)} />
		</div>
		</Router>
	</Provider>, document.getElementById('app'));