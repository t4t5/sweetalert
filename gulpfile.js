var gulp = require('gulp'); 

var jshint    = require('gulp-jshint');
var sass      = require('gulp-sass');
var concat    = require('gulp-concat');
var uglify    = require('gulp-uglify');
var rename    = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');

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
    .pipe(gulp.dest('lib'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src('lib/sweet-alert.js')
    .pipe(gulp.dest('lib'))
    .pipe(rename('sweet-alert.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('lib'));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('lib/*.js', ['lint', 'scripts']);
  gulp.watch(['lib/*.scss', 'lib/*.css'], ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);