var gulp = require('gulp');
var watch = require('gulp-watch');
var ts = require('gulp-typescript');
var rename = require('gulp-rename');

gulp.task('js:typescript', function () {
	return gulp.src('app/js/index.ts')
		.pipe(ts({
			noImplicitAny: true,
			out: 'output.js'
		}))
		.pipe(rename('output.js'))
		.pipe(gulp.dest('build/js'));
});

gulp.task('js:typescript:watch', function (cb) {
    gulp.watch('app/js/*.ts', ['js:typescript']);
});