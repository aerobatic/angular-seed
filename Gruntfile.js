module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'app/js/**/*.js', 'test/**/*.js']
    },
    uglify: {
      build: {
        files: {
          'dist/app.min.js': ['tmp/templates.js', 'tmp/annotated.js']
        }
      }
    },
    cssmin: {
      minify: {
        src: ['bower_components/normalize-css/normalize.css', 'app/css/styles.css'],
        dest: 'dist/app.min.css'
      }
    },
    // Inject the angular dependency injection
    ngAnnotate: {
      target: {
        files: {
          'tmp/annotated.js': ['app/js/**/*.js']
        }
      }
    },
    html2js: {
      // Compile partial views into an angular module called 'templates' (name is important).
      // In debug mode template files are loaded directly via XHR. In release builds the 
      // tmp/templates.js file should be included in the app.min.js script. Templates will be 
      // preloaded in the $templateCache avoiding additional network round trips.
      options: {
        base: 'app',
        module: 'templates',
        singleModule: true
      },
      main: {
        src: ['app/partials/*.html'],
        dest: 'tmp/templates.js'
      },
    },
    copy: {
      dist: {
        files: [
          {src: 'app/index.html', dest: 'dist/index.html'},
          {src: 'app/favicon.ico', dest: 'dist/favicon.ico'},
          {expand: true, cwd:'app', src: ['images/**'], dest: 'dist/'}
        ]
      }
    },
    concat: {
      vendor: {
        // Include any other vendor components
        src: ['node_modules/angular-aerobatic/angular-aerobatic.min.js'],
        dest: 'dist/vendor.min.js',
      }
    },
    clean: ['dist', 'tmp'],
    // See https://github.com/karma-runner/grunt-karma for more options
    karma: {
      options: {
        files: [
          'node_modules/angular/angular.js',
          'node_modules/angular/angular-route.js',
          'node_modules/angular/angular-mocks.js',
          'app/js/**/*.js',
          'test/unit/**/*.js'
        ],
        frameworks: ['jasmine'],
        browsers: ['Chrome'],
        logLevel: 'INFO',
        plugins : [
          'karma-jasmine',
          'karma-chrome-launcher'
        ],
        reporters: 'dots'
      },
      unit: {
        singleRun: true
      }
    }
  });

  // Specify the sync arg to avoid blocking the watch
  grunt.registerTask('build', ['clean', 'jshint', 'html2js', 'cssmin', 'ngAnnotate', 'uglify', 'concat', 'copy:dist']);
  grunt.registerTask('test', ['karma']);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-karma');
};
