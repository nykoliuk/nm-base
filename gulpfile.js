var gulp   = require('gulp'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    rigger = require('gulp-rigger'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    reload = browserSync.reload;

const path = {
    build: {
        js: 'assets/js/',
        css: 'assets/css/'
    },
    src: {
        js: 'src/js/*.js',
        sass: 'src/sass/**/*.scss'
    }
}

gulp.task('bs', function() {
    var files = [
    './assets/css/*.min.css',
    './assets/js/*.min.js',
    './**/*.php'
    ];
	browserSync.init(files, {
		proxy: 'http://nm-base',
        notify: false
	});
});

gulp.task('scripts', function () {
    gulp.src(path.src.js)
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('vendors', function() {
    gulp.src(path.src.vendors)
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(rename( {
            basename: "vendors",
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js));
});

gulp.task('styles', function () {
    gulp.src(path.src.sass)
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer('last 2 version'))
        .pipe(minifyCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
	gulp.watch('./src/sass/**/*.scss', ['styles']);
	gulp.watch('./src/js/**/*.js', ['scripts']);
});

gulp.task('default', ['styles', 'scripts', 'bs', 'watch']);
