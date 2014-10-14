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
					'lib/sweet-alert.css':'lib/sweet-alert.scss'
				}
			}
		},

		cssmin: {
			dist: {
				files: {
					'lib/sweet-alert.min.css': ['lib/sweet-alert.css']
				},
				options: {
					banner: '/*! <%= pkg.name %> | v<%= pkg.version %> | <%= pkg.author %> | <%= pkg.license %> | <%= pkg.homepage %> */ \n'
				}
			}
		},

		uglify: {
			build: {
				src: 'lib/sweet-alert.js',
				dest: 'lib/sweet-alert.min.js'
			},
			options: {
				banner: '/*! <%= pkg.name %> | v<%= pkg.version %> | <%= pkg.author %> | <%= pkg.license %> | <%= pkg.homepage %> */ \n',
				preserveComments: 'some'
			}
		},
		
		watch: {
			sass: {
				files: ['lib/sweet-alert.scss'],
				tasks: ['sass'],
				options: {
					spawn: false
				}
			}
		}

	});

	grunt.registerTasks('default', ['watch']);
	grunt.registerTasks('build', [
		'uglify',
		'sass',
		'cssmin'
	]);
};