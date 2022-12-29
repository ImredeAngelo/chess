const config = require('@buildtools/webpack');
// const paths = require('./src/routes.js').paths;

// ===== EXPORT
module.exports = (env, options) => [ 
    config.StaticReact18({
        mode: options.mode,
        entry: './index.js',
        paths: ['/', '/check', '/events']
    })
]