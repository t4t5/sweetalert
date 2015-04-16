var gulp = require('gulp'); 

var glob      = require('glob');
var path      = require('path');
var jshint    = require('gulp-jshint');
var sass      = require('gulp-sass');
var concat    = require('gulp-concat');
var uglify    = require('gulp-uglify');
var rename    = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var babel     = require('gulp-babel');
var babelify  = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var wrap = require("gulp-wrap");

// Lint Task
gulp.task('lint', function() {
  return gulp.src('lib/sweet-alert.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {

  gulp.src('example/example.scss')
    .pipe(sass())
    .pipe(rename('example.css'))
    .pipe(gulp.dest('example'));

  return gulp.src(['lib/sweet-alert.scss', 'lib/ie9.css'])
    .pipe(sass())
    .pipe(concat('sweet-alert.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist'));
});

// Compile theme CSS
var themes = glob.sync('lib/themes/*').map(function(themeDir) {
  return path.basename(themeDir);
});

themes.forEach(function(name) {
  gulp.task(name + '-theme', function() {
    return gulp.src('lib/themes/' + name + '/' + name + '.scss')
      .pipe(sass()) // etc
      .pipe(rename(name + '.css'))
      .pipe(gulp.dest('dist/themes/' + name))
  });
});

gulp.task('themes', themes.map(function(name){ return name + '-theme'; }));


// Concatenate & Minify JS
gulp.task('scripts', function() {
  // return gulp.src('lib/sweet-alert.js')
  //   .pipe(babel())
  //   .pipe(gulp.dest('dist'))
  //   .pipe(rename('sweet-alert.min.js'))
  //   .pipe(uglify())
  //   .pipe(gulp.dest('dist'));

  return browserify({
      entries: './lib/sweet-alert.js',
      debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('output.js'))
    //.pipe(streamify(uglify()))
    .pipe(wrap(';(function(window, document, undefined) {\n"use strict";\n<%= contents %>\n})(window, document);'))
    .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('lib/*.js', ['lint', 'scripts']);
  gulp.watch(['lib/*.scss', 'lib/*.css'], ['sass']);
  gulp.watch('lib/themes/*/*.scss', ['themes']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);