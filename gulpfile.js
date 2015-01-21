var gulp = require('gulp');

var jshint    = require('gulp-jshint');
var sass      = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
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

  gulp.src(['lib/ie8.css', 'lib/sweet-alert.scss', 'lib/ie9.css'])
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ['Explorer >= 8',
               'Safari >= 4',
               'Firefox >= 3',
               'Chrome >= 14',
               'Opera >=15'],
    cascade: false
  }))
  .pipe(concat('sweet-alert.css'))
  .pipe(gulp.dest('dist'))
  .pipe(rename('sweet-alert.min.css'))
  .pipe(minifyCSS())
  .pipe(gulp.dest('dist'));

});

// Concatenate & Minify JS
gulp.task('scripts', function() {

  return gulp.src('lib/sweet-alert.js')
  .pipe(gulp.dest('dist'))
  .pipe(rename('sweet-alert.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('lib/*.js', ['lint', 'scripts']);
  gulp.watch(['lib/*.scss', 'lib/*.css'], ['sass']);
});

// Default Task , 'watch'
gulp.task('default', ['lint', 'sass', 'scripts']);
