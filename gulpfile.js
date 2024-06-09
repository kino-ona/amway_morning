'use strict';
const gulp   = require('gulp'),
	plumber  = require('gulp-plumber'),
	watch    = require('gulp-watch'),
	cleanCSS = require('gulp-clean-css'),
	rename   = require('gulp-rename'),
	browser = require('browser-sync');
;

//clean-css options
var settingCleanCSS = {
	//compatibility: 'ie9',
	//format: 'keep-breaks',
	inline: false,
	level: {
		1: {all: false, replaceZeroUnits: true, tidySelectors: true},
		2: {all: false, removeDuplicateRules: false}
	}
};

//css minify
function cssMinify() {
	return gulp
		.src(['./_ui/responsive/theme-blue/css/*.css','!./_ui/responsive/theme-blue/css/bootstrap.css','!./_ui/responsive/theme-blue/**/*.min.css'])
		.pipe(plumber())
		.pipe(cleanCSS(settingCleanCSS))
		//.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest("./_ui/responsive/theme-blue/css/min/"))
}

function watchFiles() {
	gulp.watch('./_ui/responsive/theme-blue/css/*.css', cssMinify);
}

const cssBeautify = gulp.series(cssMinify, gulp.parallel(watchFiles));

gulp.task('serv', () => {
	browser.init({
        server: {
            baseDir: './',
			index: './_ui/publishing_guide_2024.html'
        },
		ghostMode: false,
		open: "external"
    });

    gulp.watch(['./_ui/**/*.html', './_ui/**/*.js', './_ui/**/*.css',], browser.reload);
});

// gulp.task('server', ["serv"])

exports.server = 'serv';
exports.cssMin = cssMinify;
exports.watch = watchFiles;
exports.default = cssBeautify;