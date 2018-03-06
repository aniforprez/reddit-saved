let config = {};

if(process.env.NODE_ENV !== 'production') {
	config = require('./config.dev.js');
} else {
	config = require('./config.prod.js');
}

export default config;
