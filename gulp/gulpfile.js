var gulp         = require('gulp');
var rename       = require('gulp-rename');
var browserSync  = require('browser-sync');
var reload       = browserSync.reload;
var notify       = require('gulp-notify');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "../",
            index: "example/index.html"
        }
    });
});

gulp.task('page-styles', function() {
  return gulp.src('../example/example.css')
    //Parse
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 4 versions'))
    .pipe(gulp.dest('example'))
    //Reload
    .pipe(reload({stream:true}));
    // .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('sweet-alert-styles', function() {
    return gulp.src('../lib/sweet-alert.scss')
    //Parse
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 4 versions'))
    .pipe(gulp.dest('../lib'))
    //Reload
    .pipe(reload({stream:true}))
    .pipe(notify({ message: 'Sweet-alert task complete' }));
});
  

// Default task to be run with gulp
gulp.task('default', ['sweet-alert-styles', 'browser-sync'], function () {
    gulp.watch("../example/*.scss", ['page-styles'])
    gulp.watch("../lib/sweet-alert.scss", ['sweet-alert-styles']);

});