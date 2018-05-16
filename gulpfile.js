const gulp = require('gulp');  
const sass = require('gulp-sass');  
const browserSync = require('browser-sync');
const uglify = require('gulp-uglify');
const pump = require('pump');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const gulpStylelint = require('gulp-stylelint');
const csscomb = require('gulp-csscomb');

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
  gulp.src([config.app+'**/**/*.*', '!'+config.app+'scss/**/*.*', '!'+config.app+'js/_*.*'])
    .pipe(gulp.dest(config.dist));
});

// SASS //

gulp.task('sass', function () { 
  
  // csscomb.json
  gulp.src(config.app+'scss/**/*.scss')
    .pipe(csscomb())
    .pipe(gulp.dest(config.app+'scss'));

  // stylelinerc
  gulp.src(config.app+'scss/**/*.scss')
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));

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

// Concatinate and Uglify to Dist //

gulp.task('scripts', function(){
  return gulp.src(config.app+'js/_*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest(config.dist+'js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.dist+'js'));
});

// Watch files for changes //

gulp.task('watch', function(){
  gulp.watch('*.html', ['copy-html']);
  gulp.watch(config.app+'scss/**/*.scss', ['sass']);
  gulp.watch(config.app+'js/**/*.js', ['scripts']);
})

// Gulp Task - Run in Sequence //

gulp.task('default', function () {  
  runSequence('clean', ['copy-html' , 'copy-files' , 'sass', 'browser-sync', 'scripts' ], 'watch');
});