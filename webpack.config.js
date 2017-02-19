'use strict';


switch (process.env.npm_lifecycle_event) {
    case 'start':
        module.exports = require('./webpack.config.dev.js');
    break;
    case 'dev':
        module.exports = require('./webpack.config.dev.js');
    break;
    case 'build':
        module.exports = require('./webpack.config.prod.js');
    break;
    default:
        module.exports = require('./webpack.config.dev.js');
    break;
}