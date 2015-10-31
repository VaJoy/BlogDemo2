var isCI = process.env.CONTINUOUS_INTEGRATION === 'true';
var webpackConfig = require('./webpack.config.js');
module.exports = function(config) {
    config.set({

        basePath: '',

        frameworks: [
            'mocha', 'chai', 'phantomjs-shim'
        ],

        files: [
            'test/*.js'
        ],

        preprocessors: {
            'test/*.js': ['webpack']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: true
        },

        port: 9876,

        colors: true,

        autoWatch: true,

        browsers: ['PhantomJS', 'PhantomJS_custom'],

        // you can define custom flags
        customLaunchers: {
            'PhantomJS_custom': {
                base: 'PhantomJS',
                options: {
                    windowName: 'my-window',
                    settings: {
                        webSecurityEnabled: false
                    }
                },
                flags: ['--load-images=true'],
                debug: true
            }
        },

        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        },

        singleRun: isCI
    });
};