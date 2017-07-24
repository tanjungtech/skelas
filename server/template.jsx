import React from 'react';
import Helmet from 'react-helmet';

class Template extends React.Component {
	render() {
		let head = Helmet.rewind();
		return(
			<!doctype html>
			<html ${head.htmlAttributes.toString()}>
                <head>
					{head.title.toComponent()}
					{head.meta.toComponent()}
					<meta charset="UTF-8">
					<link rel="shortcut icon" href="public/favicons/favicon.ico">
					<link rel="apple-touch-icon" sizes="180x180" href="public/favicons/apple-touch-icon.png">
					<link rel="icon" type="image/png" sizes="32x32" href="public/favicons/favicon-32x32.png">
					<link rel="icon" type="image/png" sizes="16x16" href="public/favicons/favicon-16x16.png">
					<link rel="manifest" href="public/favicons/manifest.json">
					<link rel="mask-icon" href="public/favicons/safari-pinned-tab.svg" color="#5bbad5">
                </head>
                <body ${head.bodyAttributes.toString()}>
                	<div id="app">
                	</div>
            		<script src="bundle.js"></script>
                </body>
            </html>
		);
	}
}

export default Template;