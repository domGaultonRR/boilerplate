var gulp = require('gulp');  
var sass = require('gulp-sass');  
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var pump = require('pump');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

// Variables //

var config = {
	app: './app/',
	dist: './dist/',
	root: './'
}

// Clean //

gulp.task('clean', function () {
    return gulp.src(config.dist, {read: false})
        .pipe(clean());
});

// Copy HTML to Dist //

gulp.task('copy-html', function () {
    gulp.src('index.html')
        .pipe(gulp.dest(config.dist));
});

// Copy Folders to Dist //

gulp.task('copy-files', function () {
    gulp.src([config.app+'**/**/*.*', "!"+config.app+'scss/**/*.*'])
        .pipe(gulp.dest(config.dist));
});

// SASS //

gulp.task('sass', function () {  
    gulp.src(config.app+'scss/main.scss')
        .pipe(sass({includePaths: ['scss']}))
        .pipe(gulp.dest(config.dist+'css'));
});

// Browser Sync //

gulp.task('browser-sync', ['clean'],function() {  
    browserSync.init([config.app+'scss/*.scss', config.app+'js/*.js', '*.html'], {
        server: {
            baseDir: config.dist
        }
    });
});

// Compress //

gulp.task('compress', function (cb) {
    pump([
        gulp.src(config.app+'**/*.js'),
        uglify(),
        gulp.dest(config.dist)
    ],
    cb
    );
});

// Watch files for changes //

gulp.task('watch', function(){
    gulp.watch('*.html', ['copy-html']);
    gulp.watch(config.app+'scss/**/*.scss', ['sass']);
    gulp.watch(config.app+'js/**/*.js', ['compress']);
})

// Gulp Task - Run in Sequence //

gulp.task('default', function () {  
    runSequence('clean', ['copy-html' , 'copy-files' , 'sass', 'browser-sync', 'compress'], 'watch');
});