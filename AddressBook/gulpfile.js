
const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var paths = {
    pages: ['src/*.html']
};

gulp.task('styles', () => {
    return gulp.src('Styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./content/'));
});

gulp.task('clean', () => {
    return del([
        'css/main.css',
    ]);
});

gulp.task('transpile', function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['ts/main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./Scripts/site'));
});

gulp.task('default', gulp.series(['clean', 'styles', 'transpile']));