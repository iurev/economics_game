var gulp = require('gulp');
var watch = require('gulp-watch');
var ts = require('gulp-typescript');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');

gulp.task('js:typescript', function () {
	return gulp.src('app/js/*.ts')
		.pipe(ts())
		.pipe(gulp.dest('app/js'));
});

gulp.task('js:browserify', function () {
  return gulp.src('app/js/index.js')
		.pipe(browserify({
		  insertGlobals : true,
		  debug: true
		}))
    .pipe(rename('output_all.js'))
		.pipe(gulp.dest('build/js'))
});

gulp.task('js:typescript:watch', function (cb) {
    gulp.watch('app/js/*.ts', ['js:typescript']);
});

gulp.task('js:js:watch', function (cb) {
    gulp.watch('build/js/output.js', ['js:browserify']);
});

gulp.task('js:watch', ['js:typescript:watch', 'js:js:watch'])
