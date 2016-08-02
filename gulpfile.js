var gulp = require("gulp");
var gutil = require("gulp-util");
var uglifyJS = require("gulp-uglify");
var uglifyCSS = require("gulp-uglifycss");
var watch = require("gulp-watch");
var jshint = require("gulp-jshint");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var concatCSS = require("gulp-concat-css");

gulp.task("default", function () {

    gutil.log("Gulp is working!");
    gulp.start('watch');
});

gulp.task('uglifyJS', function () {

    gutil.log('Starting uglifyJS task.');
    gulp.src(['src/js/**/*.js'])
        .pipe(uglifyJS())
        .pipe(gulp.dest('build/js'));
});


gulp.task('uglifyCSS', function () {

    gutil.log('Starting uglifyCSS task.');
    gulp.src(['src/js/**/*.js'])
        .pipe(uglifyCSS())
        .pipe(gulp.dest('build/js'));
});

gulp.task('concatJS', function() {

    gutil.log('Starting concatJS task.');
    gulp.src('build/js/**/*.js')
        .pipe(concat('all_files_concated.js'))
        .pipe(gulp.dest('build'));
});

gulp.task("concatCSS", function () {

    gutil.log('Starting concatCSS task.');
    gulp.src('build/css/**/*.css')
        .pipe(concatCSS('all_files_concated.css'))
        .pipe(gulp.dest('build'));
});

gulp.task('jshint', function () {

    gutil.log('Starting jshint task.');
    return gulp.src('src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('buildCSS', function () {

    gutil.log('Starting buildCSS task.');
    return gulp.src("src/scss/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("build/css"));
});

gulp.task('watch', function () {

    gutil.log('Starting watch task.');
    gulp.watch('src/js/**/*.js', function (event) {
        gutil.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.start('jshint');
        gulp.start('uglifyJS');
        gulp.start('concatJS');
    });

    gulp.watch('src/scss/**/*.scss', function (event) {
        gutil.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.start('buildCSS');
        gulp.start('uglifyCSS');
        gulp.start('concatCSS');
    });
});

