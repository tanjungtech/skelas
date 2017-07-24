import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages.jsx';
import auth from './reducers/auth.jsx';

export default combineReducers({
	flashMessages,
	auth
});
