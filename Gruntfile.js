module.exports = function(grunt)	{
	
	'use strict';

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'src/sweet-alert.css':'src/sweet-alert.scss'
				}
			}
		},

		cssmin: {
			dist: {
				files: {
					'lib/sweet-alert.min.css': ['src/sweet-alert.css']
				},
				options: {
					banner: '/*! <%= pkg.name %> | v<%= pkg.version %> | <%= pkg.author %> | <%= pkg.license %> | <%= pkg.homepage %> */ \n'
				}
			}
		},

		uglify: {
			build: {
				src: 'src/sweet-alert.js',
				dest: 'lib/sweet-alert.min.js'
			},
			options: {
				banner: '/*! <%= pkg.name %> | v<%= pkg.version %> | <%= pkg.author %> | <%= pkg.license %> | <%= pkg.homepage %> */ \n',
				preserveComments: 'some'
			}
		},
		
		watch: {
			sass: {
				files: ['src/sweet-alert.scss'],
				tasks: ['sass'],
				options: {
					spawn: false
				}
			},

			script: {
				files: ['src/sweet-alert.js'],
				tasks: ['lib/sweet-alert.min.js'],
				options: {
					spawn: false
				}
			}
		}

	});

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', [
		'uglify',
		'sass',
		'cssmin'
	]);
};