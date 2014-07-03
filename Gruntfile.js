module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'js/**/*.js', 'test/**/*.js']
    },
    favicons: {
      options: {
        appleTouchBackgroundColor: "#ffffff",
        html: 'index.html',
        HTMLPrefix: 'favicons/',
        windowsTile: false
      },
      icons: {
        src: 'favicon.png',
        dest: 'favicons'
      }
    },
    uglify: {
      build: {
        files: {
          'dist/app.min.js': ['tmp/build.js']
        }
      }
    },
    stylus: {
      compile: {
        options: {
          paths: ['css'],
          'include css': true
        },
        files: {
          'tmp/styles.css': ['css/*.styl'] // compile and concat into single file
        }
      }
    },
    cssmin: {
      minify: {
        src: ['tmp/styles.css'],
        dest: 'dist/styles.min.css'
      }
    },
    ngmin: {
      target: {
        src: ['js/**/*.js'],
        dest: 'tmp/build.js'
      }
    },
    watch: {
      options: {
        spawn: true,
        livereload: true
      },
      stylus: {
        files: ['css/*.styl', 'css/*.css'],
        tasks: ['stylus', 'cssmin', 'clean']
      },
      js: {
        files: ['js/**/*.js'],
        tasks: ['jslint']
      }
    },
    clean: ['tmp'],
    aerobatic: {
      deploy: {
        src: ['index.html', 'dist/*.*', 'favicons/*', 'partials/*.html', 'images/*.jpeg'],
      },
      sim: {
        index: 'index.html',
        port: 3000,
        livereload: true
      }
    },
    // See https://github.com/karma-runner/grunt-karma for more options
    karma: {
      options: {
        files: [
          'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.10/angular.min.js',
          'http://cdnjs.cloudflare.com/ajax/libs/jasmine/2.0.0/jasmine.js',
          'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.10/angular-route.min.js',
          'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.9/angular-mocks.js',
          'js/**/*.js',
          'test/unit/**/*.js'
        ],
        frameworks: ['jasmine'],
        browsers: ['Chrome'], //['PhantomJS'],
        logLevel: 'INFO',
        plugins : [
          'karma-jasmine',
          'karma-phantomjs-launcher',
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
  grunt.registerTask('sim', ['build', 'aerobatic:sim:sync', 'watch']);
  grunt.registerTask('deploy', ['build', 'aerobatic:deploy']);

  grunt.registerTask('build', ['jshint', 'stylus', 'cssmin', 'ngmin', 'uglify', 'clean']);
  grunt.registerTask('test', ['karma']);

  grunt.loadNpmTasks('grunt-favicons');
  grunt.loadNpmTasks('grunt-aerobatic');
  // grunt.loadTasks('../grunt-aerobatic/tasks');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-karma');
};
