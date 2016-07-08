/**
 * Created by reamd on 5/28/2016.
 */
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    del = require('del');

    gulp.task('scripts', function() {
        return gulp.src('src/*.js')
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify())
            .pipe(gulp.dest('dist/'))
            .pipe(notify({ message: 'Scripts task complete' }));
    });

    gulp.task('clean', function(cb) {
        del(['dist/'], cb)
    });

    gulp.task('default', function() {
        gulp.run
        ('clean', 'scripts');
    });