var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefix = require('gulp-autoprefixer');

gulp.task('sass', function() {
  return gulp.src('example.scss')
    .pipe(sass())
    .pipe(autoprefix())
    .pipe(gulp.dest('./'));
});
