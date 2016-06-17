// Karma configuration
// Generated on Tue Jun 14 2016 19:58:35 GMT+0700 (ICT)

var webpackConfig = require('./webpack.config')
var istanbulLoader = require('istanbul-instrumenter-loader')

module.exports = function(config) {
	config.set({
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],

		// list of files / patterns to load in the browser
		files: [
			'spec/*_spec.ts'
		],

		// list of files to exclude
		exclude: [],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'spec/*.ts': ['webpack']
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['mocha', 'coverage', 'karma-remap-istanbul'],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['PhantomJS'],

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity,

		webpack: {
			resolve: webpackConfig.resolve,
			devtool: 'inline-source-map',
			module: {
				loaders: [{
					test: /\.ts$/,
					loader: 'ts-loader'
				}],
				postLoaders: [{
					test: /\.ts$/,
					loader: 'istanbul-instrumenter'
				}]
			}
		},

		webpackMiddleware: {
			noInfo: true
		},

		plugins: [
			'karma-webpack',
			'karma-jasmine',
			'karma-phantomjs-launcher',
			'karma-remap-istanbul',
			'karma-coverage',
			'karma-mocha-reporter'
		],

		coverageReporter: {
			reporters: [{
				type: 'json'
			}],
			dir: './coverage/',
			subdir: function(browser) {
				return browser.toLowerCase().split(/[ /-]/)[0]
			}
		}
	})
}