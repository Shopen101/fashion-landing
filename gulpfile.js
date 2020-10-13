const gulp = require('gulp');
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');


gulp.task('sass-compile', function () {
	return gulp.src('scss/main.scss')
	.pipe(plumber())
	.pipe(sourceMaps.init())
	.pipe(autoprefixer({
		browers: ['last 2 version']
	}))
	.pipe(sass().on('error' , sass.logError))
	.pipe(sourceMaps.write())
	.pipe(gulp.dest('./css/'))
	.pipe(browserSync.stream())
});

gulp.task('watch', function(){
	browserSync.init({
		server: {
			baseDir: '/html/проект #2  на scss/'
		}
	})
	gulp.watch('./scss/**/*.scss', gulp.series('sass-compile'))
	gulp.watch('./*.html').on('change', browserSync.reload)
});