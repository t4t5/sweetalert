var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

gulp.task('compress', function() {
  gulp.src('lib/sweetalert2.js')
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function() {
  gulp.src('lib/sweetalert2.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist'));
});
