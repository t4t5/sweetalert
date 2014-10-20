module.exports = (grunt) ->
  require('load-grunt-tasks') grunt

  grunt.initConfig
    less:
      lib:
        files:
          'lib/sweet-alert.css': 'lib/sweet-alert-combine.less'

    uglify:
      lib:
        files:
          'lib/sweet-alert.min.js': 'lib/sweet-alert.js'

    watch:
      lib:
        options:
          livereload: 32123
        files: ['**/*.{less,html,css}', 'lib/sweet-alert.js']
        tasks: ['compile']

    open:
      example:
        path: 'http://localhost:7777/'

    connect:
      server:
        options:
          port: 7777
          hostname: '*'
          base: '.'

  grunt.registerTask 'compile', ['less', 'uglify']

  grunt.registerTask 'default', ['compile', 'connect', 'open', 'watch']
