var webpackConfig = require('./webpack.config.test.js');
var path = require('path');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    // files: [
    //   // // support libraries
    //   // 'dist/react.js',
    //   // 'dist/react-dom.js',
    //   // // source files
    //   // 'src/**/*.{ts,tsx}',
    //   // test specs
    //   'spec/**/*_[Ss]pec.{ts,tsx}'
    // ],

    files: [
        'spec/testing.js'
    ],
    // preprocessors: {
    //     'spec/testing.js': 'webpack'
    // },
    preprocessors: {
      'testing.js': [
        'webpack',
        'sourcemap',
        'sourcemap-writer', // important!
        'coverage'          // important!
      ]
    },
    // list of files to exclude
    exclude: [
    ],

    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },



    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    // preprocessors: {
    //   'spec/**/*_[Ss]pec.{ts,tsx}': ['webpack'],
    //   'src/**/*.{ts,tsx}': ['coverage'],
    // },
    //
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage'],

    // coverageReporter: {
    //   includeAllSources: true,
    //   reporters: [
    //     { type: 'text' },
    //     { type: 'lcov', dir: 'coverage', subdir: '.', },
    //   ],
    // },
    coverageReporter: { // important!
          type: 'json',
          subdir: '.',
          file: 'coverage-final.json'
        },

    specReporter: {
      maxLogLines: 5,
      suppressSkipped: true,
      suppressPassed: true,
    },

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
    browsers: [
      // 'PhantomJS',
      // 'Firefox',
      'Chrome',
      // 'ChromeCanary',
      // 'Safari',
    ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  })
}
