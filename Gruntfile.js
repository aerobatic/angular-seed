module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'js/**/*.js', 'test/**/*.js']
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
        src: ['bower_components/normalize-css/normalize.css', 'css/styles.css'],
        dest: 'dist/app.min.css'
      }
    },
    // Inject the angular dependency injection
    ngAnnotate: {
      target: {
        files: {
          'tmp/annotated.js': ['js/**/*.js']
        }
      }
    },
    html2js: {
      options: {
        base: 'partials',
        module: 'templates',
        singleModule: true
      },
      main: {
        src: ['partials/*.html'],
        dest: 'tmp/templates.js'
      },
    },
    watch: {
      options: {
        spawn: true,
        livereload: true
      },
      // Regenerate templates.js whenever a partial changes
      templates: {
        files: ['partials/*.html'],
        tasks: ['html2js']
      },
      html: {
        files: ['index.html'],
      },
      css: {
        files: ['css/*.css'],
      },
      js: {
        files: ['js/**/*.js']
      }
    },
    concat: {
      vendor: {
        // Include any other vendor components
        src: ['bower_components/angular-aerobatic/angular-aerobatic.min.js'],
        dest: 'dist/vendor.min.js',
      }
    },
    clean: ['tmp'],
    aerobatic: {
      deploy: {
        cowboy: true,
        src: ['index.html', 'dist/*.*', 'favicon.ico', 'images/*.*'],
      },
      sim: {
        port: 3000,
        livereload: true
      }
    },
    // See https://github.com/karma-runner/grunt-karma for more options
    karma: {
      options: {
        files: [
          'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.10/angular.min.js',
          'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.10/angular-route.min.js',
          'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.9/angular-mocks.js',
          'js/**/*.js',
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
  grunt.registerTask('sim', ['html2js', 'aerobatic:sim:sync', 'watch']);
  grunt.registerTask('deploy', ['build', 'aerobatic:deploy']);

  grunt.registerTask('build', ['jshint', 'html2js', 'cssmin', 'ngAnnotate', 'uglify', 'concat', 'clean']);
  grunt.registerTask('test', ['karma']);

  grunt.loadNpmTasks('grunt-aerobatic');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-karma');
};
