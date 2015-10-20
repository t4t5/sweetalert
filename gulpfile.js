var gulp = require('gulp');

var glob       = require('glob');
var path       = require('path');
var jshint     = require('gulp-jshint');
var sass       = require('gulp-sass');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var rename     = require('gulp-rename');
var minifyCSS  = require('gulp-minify-css');
var babelify   = require('babelify');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var wrap       = require('gulp-wrap');
var qunit      = require('gulp-qunit');
var babel      = require('gulp-babel');

// Lint Task
gulp.task('lint', function() {
  gulp.src('dev/sweetalert.es6.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));

  return gulp.src('dev/*/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {

  gulp.src('example/example.scss')
    .pipe(sass())
    .pipe(rename('example.css'))
    .pipe(gulp.dest('example'));

  // (We don't use minifyCSS since it breaks the ie9 file for some reason)
  gulp.src(['dev/sweetalert.scss', 'dev/ie9.css', 'dev/loader-animation.css'])
    .pipe(sass())
    .pipe(concat('sweetalert.css'))
    .pipe(gulp.dest('dist'));
});


// Compile theme CSS
var themes = glob.sync('themes/*').map(function(themeDir) {
  return path.basename(themeDir);
});

themes.forEach(function(name) {
  gulp.task(name + '-theme', function() {
    return gulp.src('themes/' + name + '/' + name + '.scss')
      .pipe(sass()) // etc
      .pipe(rename(name + '.css'))
      .pipe(gulp.dest('themes/' + name))
  });
});

gulp.task('themes', themes.map(function(name){ return name + '-theme'; }));

// Compile ES5 CommonJS entry point
gulp.task('commonjs', function() {
  gulp.src('./dev/sweetalert.es6.js')
    .pipe(babel())
    .pipe(rename('sweetalert.js'))
    .pipe(gulp.dest('lib'));
  gulp.src('./dev/modules/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib/modules'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return browserify({
      entries: './dev/sweetalert.es6.js',
      debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('sweetalert-dev.js'))
    .pipe(wrap({
      src: './dev/gulpfile-wrap-template.js'
    }))
    .pipe(gulp.dest('dist')) // Developer version

    .pipe(rename('sweetalert.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('dist')); // User version
});

gulp.task('test', function() {
  return gulp.src('./test/index.html')
    .pipe(qunit({
      timeout: 20
    }));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(['dev/*.js', 'dev/*/*.js'], ['lint', 'scripts']);
  gulp.watch(['dev/*.scss', 'dev/*.css'], ['sass']);
  gulp.watch('themes/*/*.scss', ['themes']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'commonjs', 'watch', 'test']);
