import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';

import users from './routes/users.jsx';
import auth from './routes/auth.jsx';
import events from './routes/events.jsx';

var mongoose = require('mongoose');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/events', events);

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
	hot: true,
	publicPath: webpackConfig.output.publicPath,
	noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, './index.html'));
});

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
   app.use('/favicon.ico', express.static(__dirname + '/public/favicons/favicon.ico'));
}

app.listen(5000, () => console.log('Running on localhost:5000'));

mongoose.connection.openUri('mongodb://localhost/skdbcoll');