var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass   = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
  return gulp.src('lib/sweet-alert.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Our Sass & add Browser Prefixes
gulp.task('sass', function () {

  gulp.src('example/example.scss')
  .pipe(sass())
  .pipe(rename('example.css'))
  .pipe(gulp.dest('example'));

  return gulp.src('lib/sweet-alert.scss')
  .pipe(sass())
  .pipe(gulp.dest('dist'))
  .pipe(rename('sweet-alert.css'))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dist'));
});


// Concatenate & Minify JS
gulp.task('scripts', function() {

  gulp.src('lib/sweet-alert.js')
  .pipe(gulp.dest('dist'));

  return gulp.src('lib/sweet-alert.js')
    .pipe(rename('sweet-alert.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('lib/*.js', ['lint', 'scripts']);
  gulp.watch('lib/*.scss', ['sass']);
});

//Minify CSS
gulp.task('minify CSS', function () {
  gulp.src('src/**/*.css')
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dist'));
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
