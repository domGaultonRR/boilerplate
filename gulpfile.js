var gulp = require('gulp');  
var sass = require('gulp-sass');  
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var pump = require('pump');
var clean = require('gulp-clean');

// Variables //

var config = {
	app: './app/',
	dist: './dist/',
	root: './'
}

// SASS //

gulp.task('sass', function () {  
    gulp.src(config.app+'scss/main.scss')
        .pipe(sass({includePaths: ['scss']}))
        .pipe(gulp.dest(config.dist+'css'));
});

// Uglify //

gulp.task('compress', function (cb) {
    pump([
        gulp.src(config.app+'**/*.js'),
        uglify(),
        gulp.dest(config.dist)
    ],
    cb
    );
});

// Clean //

gulp.task('clean', function () {
    return gulp.src(config.dist, {read: false})
        .pipe(clean());
});

// Browser Sync //

gulp.task('browser-sync', ['clean'],function() {  
    browserSync.init([config.app+'scss/*.scss', config.app+'js/*.js', '*.html'], {
        server: {
            baseDir: config.root
        }
    });
});

// Copy HTML to Dist //

gulp.task('copy-html', function () {
    gulp.src('index.html')
        .pipe(gulp.dest(config.dist));
    // gulp.src(config.app+'img/**/*.{jpg,jpeg,png,svg}')
    //     .pipe(gulp.dest(config.dist+'img'));
});

// Gulp Task //

gulp.task('default', ['clean', 'copy-html' , 'sass', 'browser-sync', 'compress'], function () {  
    //gulp.watch(config.dist+'*.html');
    gulp.watch(config.app+'scss/**/*.scss', ['sass']);
    gulp.watch(config.app+'js/**/*.js', ['compress']);
});